export default async function handler(req, res) {
  const key = process.env.football_api_key;

  if (!key) {
    return res.status(500).json({
      error: "football_api_key n'est pas configurée"
    });
  }

  try {
    const today = new Date().toISOString().slice(0, 10);

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
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
        }
