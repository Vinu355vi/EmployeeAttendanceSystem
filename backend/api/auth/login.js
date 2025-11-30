const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = require('../../src/prisma')

module.exports = async (req, res) => {
  try {
    if (req.method === 'OPTIONS') return res.status(200).end()

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' })
    }

    const { email, password } = req.body || {}
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })

    const match = await bcrypt.compare(password, user.passwordHash)
    if (!match) return res.status(401).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'change_this_super_secret', { expiresIn: process.env.JWT_EXPIRES_IN || '1h' })

    const safe = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      employeeId: user.employeeId,
      department: user.department,
      createdAt: user.createdAt
    }

    res.json({ user: safe, token, message: 'Login successful' })
  } catch (err) {
    console.error('Login function error:', err)
    res.status(500).json({ error: 'Login failed' })
  }
}
