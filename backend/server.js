const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PostgreSQL bağlantısı
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'test_tracking',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

// Dosya yükleme için Multer konfigürasyonu
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|xlsx|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Sadece jpeg, jpg, png, pdf, xlsx, docx dosyaları yüklenebilir'));
    }
  }
});

// Uploads klasörünü static olarak servis et
app.use('/uploads', express.static('uploads'));

// ==================== ROUTES ====================

// Test bağlantısı
app.get('/api/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      message: 'Backend çalışıyor', 
      time: result.rows[0].now 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 1. Item (Cihaz) Routes
// Tüm cihazları getir
app.get('/api/items', async (req, res) => {
  try {
    const { parcaNo, isEmri, seriNo } = req.query;
    let query = 'SELECT * FROM item WHERE 1=1';
    const params = [];
    
    if (parcaNo) {
      params.push(`%${parcaNo}%`);
      query += ` AND parca_no ILIKE $${params.length}`;
    }
    
    if (isEmri) {
      params.push(`%${isEmri}%`);
      query += ` AND is_emri ILIKE $${params.length}`;
    }
    
    if (seriNo) {
      params.push(`%${seriNo}%`);
      query += ` AND seri_no ILIKE $${params.length}`;
    }
    
    query += ' ORDER BY id DESC';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Belirli parça numarasına göre cihazları getir
app.get('/api/items/by-part/:partNo', async (req, res) => {
  try {
    const { partNo } = req.params;
    const result = await pool.query(
      'SELECT * FROM item WHERE parca_no = $1',
      [partNo]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cihaz detayını getir
app.get('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM item WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cihaz bulunamadı' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Test Routes
// Tüm testleri getir
 app.get('/api/tests', async (req, res) => {
   try {
     const result = await pool.query(
       'SELECT * FROM test WHERE is_delete = FALSE ORDER BY sira ASC'
     );
     res.json(result.rows);
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 });

app.get('/api/test-item/:itemId', async (req, res) => {
  try {
    const itemId = req.params.itemId;
    
    const query = `
      SELECT t.* 
      FROM test t
      JOIN item_test ti ON t.id = ti.test_id
      WHERE ti.item_id = $1 
      AND t.is_delete = FALSE
      ORDER BY t.sira ASC
    `;
    
    const result = await pool.query(query, [itemId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Item Test Routes
// Test sonuçlarını getir (filtreleme ile)
app.get('/api/item-tests', async (req, res) => {
  try {
    const { isEmri, aselsanIsEmri, parcaNo, seriNo, status, limit = 50, offset = 0 } = req.query;
    
    let query = `
      SELECT 
        it.*,
        i.parca_no,
        i.tanimi,
        i.seri_no,
        i.is_emri,
        i.aselsan_is_emri,
        i.proje,
        t.name as test_name,
        t.item_no as test_item_no
      FROM item_test it
      LEFT JOIN item i ON it.item_id = i.id
      LEFT JOIN test t ON it.test_id = t.id
      WHERE it.is_delete = FALSE
    `;
    
    const params = [];
    
    if (isEmri) {
      params.push(`%${isEmri}%`);
      query += ` AND i.is_emri ILIKE $${params.length}`;
    }
    
    if (aselsanIsEmri) {
      params.push(`%${aselsanIsEmri}%`);
      query += ` AND i.aselsan_is_emri ILIKE $${params.length}`;
    }
    
    if (parcaNo) {
      params.push(`%${parcaNo}%`);
      query += ` AND i.parca_no ILIKE $${params.length}`;
    }
    
    if (seriNo) {
      params.push(`%${seriNo}%`);
      query += ` AND i.seri_no ILIKE $${params.length}`;
    }
    
    if (status) {
      params.push(status);
      query += ` AND it.status = $${params.length}`;
    }
    
    query += ` ORDER BY it.created_date DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Yeni test sonucu ekle
app.post('/api/item-tests', upload.single('testFile'), async (req, res) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const { item_id, test_id, test_zamani, status = 'beklemede' } = req.body;
    
    let today = new Date()
    // Item test kaydını ekle
    const itemTestResult = await client.query(
      `INSERT INTO item_test (item_id, test_id, test_zamani, status, created_date)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [item_id, test_id, test_zamani, status,today]
    );
    
    const itemTestId = itemTestResult.rows[0].id;
    
    // Eğer dosya yüklendiyse, item_test_doc tablosuna ekle
    if (req.file) {
      const fileUrl = `/uploads/${req.file.filename}`;
      await client.query(
        `INSERT INTO item_test_doc (name, url, item_test_id, created_date, update_date)
         VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
        [req.file.originalname, fileUrl, itemTestId]
      );
    }
    
    await client.query('COMMIT');
    res.status(201).json({ 
      message: 'Test sonucu başarıyla eklendi',
      itemTestId: itemTestId
    });
    
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

// Test sonucu durumunu güncelle
app.put('/api/item-tests/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['beklemede', 'başarılı', 'başarısız', 'onaylı', 'reddedildi'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Geçersiz durum' });
    }
    
    const result = await pool.query(
      'UPDATE item_test SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Test sonucu bulunamadı' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Test sonucunu sil (soft delete)
app.delete('/api/item-tests/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'UPDATE item_test SET is_delete = TRUE WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Test sonucu bulunamadı' });
    }
    
    res.json({ message: 'Test sonucu silindi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Test Dosyaları Routes
// Test dosyalarını getir
app.get('/api/item-tests/:itemTestId/documents', async (req, res) => {
  try {
    const { itemTestId } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM item_test_doc WHERE item_test_id = $1 AND is_delete = FALSE ORDER BY created_date DESC',
      [itemTestId]
    );
    
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Belge yükle
app.post('/api/item-tests/:itemTestId/documents', upload.single('document'), async (req, res) => {
  try {
    const { itemTestId } = req.params;
    const { name } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'Dosya yüklenmedi' });
    }
    
    const fileUrl = `/uploads/${req.file.filename}`;
    
    const result = await pool.query(
      `INSERT INTO item_test_doc (name, url, item_test_id, created_date, update_date)
       VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       RETURNING *`,
      [name || req.file.originalname, fileUrl, itemTestId]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Belgeyi sil
app.delete('/api/documents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'UPDATE item_test_doc SET is_delete = TRUE WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Belge bulunamadı' });
    }
    
    res.json({ message: 'Belge silindi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'Dosya boyutu çok büyük' });
    }
  }
  
  res.status(500).json({ error: error.message || 'Sunucu hatası' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint bulunamadı' });
});

// Server'ı başlat
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
  console.log(`API Test: http://localhost:${PORT}/api/test`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Server kapatılıyor...');
  await pool.end();
  process.exit(0);
});