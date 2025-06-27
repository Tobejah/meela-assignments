use std::env;
use dotenv::dotenv;
use log::info;
use poem::{
    handler, get, post, listener::TcpListener, web::{Data, Json, Path}, Route, Server, EndpointExt,
    error::ResponseError,
    http::StatusCode,
};
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use mongodb::{Client, Collection, bson::{doc}};
use thiserror::Error;

#[derive(Debug, Error)]
enum Error {
    #[error("MongoDB error: {0}")]
    Mongo(#[from] mongodb::error::Error),
    #[error("Env error: {0}")]
    Var(#[from] std::env::VarError),
    #[error("Other error: {0}")]
    Io(#[from] std::io::Error),  // <--- add this line
    #[error("Other error: {0}")]
    Other(String),
}

impl ResponseError for Error {
    fn status(&self) -> StatusCode {
        StatusCode::INTERNAL_SERVER_ERROR
    }
}


#[derive(Debug, Serialize, Deserialize)]
struct IntakeForm {
    uuid: String,
    help_request: Option<String>,
    goal: Option<String>,
    gender: Option<String>,
}

// POST /api/form 
#[handler]
async fn save_form(
    Data(collection): Data<&Collection<IntakeForm>>,
    Json(mut form): Json<IntakeForm>,
) -> Result<Json<IntakeForm>, Error> {
    // Generate UUID if missing (new form)
    if form.uuid.is_empty() {
        form.uuid = Uuid::new_v4().to_string();
    }

    collection
        .replace_one(
            doc! { "uuid": &form.uuid },
            &form,
            mongodb::options::ReplaceOptions::builder().upsert(true).build(),
        )
        .await?;

    Ok(Json(form))
}

// GET /api/form/:uuid (resume form)
#[handler]
async fn get_form(
    Data(collection): Data<&Collection<IntakeForm>>,
    Path(uuid): Path<String>,
) -> Result<Json<IntakeForm>, Error> {
    let result = collection
        .find_one(doc! { "uuid": uuid }, None)
        .await?
        .ok_or_else(|| Error::Other("Form not found".into()))?;

    Ok(Json(result))
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    dotenv().ok();
    env_logger::init();

    let mongo_url = env::var("MONGO_URL")?;
    let mongo_db = env::var("MONGO_DB")?;

    let client = Client::with_uri_str(&mongo_url).await?;
    let db = client.database(&mongo_db);
    let collection = db.collection::<IntakeForm>("forms");

    let app = Route::new()
        .at("/api/form", post(save_form))
        .at("/api/form/:uuid", get(get_form))
        .data(collection);
        .with(Cors: :new());

    let port = env::var("PORT")?.parse::<u16>().unwrap_or(3005);
    info!("Server running on port {}", port);
    Server::new(TcpListener::bind(("0.0.0.0", port)))
        .run(app)
        .await
        .map_err(Error::from)?;

    Ok(())
}
