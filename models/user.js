const db = require('../util/database');



module.exports= class User {
    constructor(id, name, email, password) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.password = password;
    }
    async save() {
      const sql = 'INSERT INTO users(name, email, password) VALUES (?, ?, ?)';
      const [rows] = await db.execute(sql, [this.name, this.email, this.password]);
      this.id = rows.insertId;
    }
    static async findById(id) {
      const sql = 'SELECT * FROM users WHERE id = ?';
      const [rows] = await db.execute(sql, [id]);
      if (rows.length) {
        const { id, name, email, password } = rows[0];
        return new User(id, name, email, password);
      }
      return null;
    }
    static async findByEmail(email) {
      const sql = 'SELECT * FROM users WHERE email = ?';
      const [rows] = await db.execute(sql, [email]);
      if (rows.length) {
        const { id, name, email, password } = rows[0];
        return new User(id, name, email, password);
      }
      return null;
    }
  async update() {
    const sql = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
    await db.execute(sql, [this.name, this.email, this.password, this.id]);
  }
  async delete() {
    const sql = 'DELETE FROM users WHERE id = ?';
    await db.execute(sql, [this.id]);
  }
}

