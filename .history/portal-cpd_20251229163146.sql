CREATE DATABASE portal_cpd;
USE portal_cpd;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('cpd','gerencia') NOT NULL
);

INSERT INTO users (username, password, role) VALUES
('cpdatacadao284', 'cpd@284', 'cpd'),
('gerenciaatacadao284', 'gerencia@284', 'gerencia');

UPDATE usuarios
SET login = 'gerenciaatacadao284',
    senha = '$2b$10$vqB/OVhRCt6.HH2uul9oJOZSZUnV3Hr6rRJSU/tDE8hZO26mvCgyS'
WHERE id = '2';

UPDATE usuarios
SET login = 'cpdatacadao284',
    senha = '$2b$10$VSAJRRGGEQz1SOVa/fwueOSwdbASPXJflCUu4Sc61mCWxqySnoLVu'
WHERE id = 'cpd';
