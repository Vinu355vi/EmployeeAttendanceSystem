// Simple health endpoint to verify Vercel functions are working
module.exports = (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
}
