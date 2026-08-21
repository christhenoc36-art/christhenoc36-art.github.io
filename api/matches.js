export default async function handler(req, res) {
  const key = process.env.football_api_key;

  if (!key) {
    return res.status(500).json({
      message: "football_api_key n'est pas configurée"
    });
  }

  try {
    const today = new Date().toISOString().split("T")[0];

    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures?date=${today}`,
      {
        headers: {
          "x-apisports-key": key
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        message: "Erreur API Football",
        error: data
      });
    }

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message
    });
  }
}
