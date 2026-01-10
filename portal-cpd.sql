-- Apaga e cria o banco
DROP DATABASE IF EXISTS portal_cpd;
CREATE DATABASE portal_cpd;
USE portal_cpd;

-- Tabela de usuários
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM(
    'cpd',
    'gerencia',
    'frentecaixa',
    'prevencao',
    'ecommerce',
    'cadastro'
  ) NOT NULL
);

-- Inserir usuários com senha em hash bcrypt
INSERT INTO users (username, password, role) VALUES
('cpdatacadao284', '$2b$10$VSAJRRGGEQz1SOVa/fwueOSwdbASPXJflCUu4Sc61mCWxqySnoLVu', 'cpd'),
('gerenciaatacadao284', '$2b$10$F60C693ewWSfDtFaq9T5Leyxv5wEvLSNHfgCXLY.xQV4pXR0ng33m', 'gerencia'),
('frentecaixa284', '$2b$10$h.9./18h8B8nfFPcLdfBaudBZk6m1ourTKuzay2iSEvPA6AnP6rwi', 'frentecaixa'),
('prevencao284', '$2b$10$9rSt7on6Nwb9i6vX3QH9NeoOb.S3UKCwVQDBXw6tyfW4t3.ZVDFfK', 'prevencao'),
('ecommerce284', '$2b$10$EQyYR5XazD9Kke.eV8paf.cya7E36nFMBvA9A.aOpYaLz5P9d1MfG', 'ecommerce'),
('cadastro284', '$2b$10$89Gq7pR7uPsT8bnA1v97x.522Jw/5dqpA1XSn.2E/C7zXX0RJRMJO', 'cadastro');

-- Tabela de avisos
CREATE TABLE avisos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mensagem VARCHAR(255) NOT NULL,
  ativo TINYINT(1) DEFAULT 1,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir aviso inicial
INSERT INTO avisos (mensagem, ativo) VALUES ('⚠️ AVISOS⚠️', TRUE);

-- Conferir se as tabelas foram criadas
SHOW TABLES;
