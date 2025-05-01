CREATE DATABASE tiendaOnline;

USE tiendaOnline;


-- CREATE TABLE personas( 
-- 	id_persona				INT AUTO_INCREMENT PRIMARY KEY,
--    nombre					VARCHAR(20)NOT NULL,
--    apellido_pat			VARCHAR(30) NOT NULL,
--    apellido_mat			VARCHAR(30)NOT NULL,
--    telefono				VARCHAR(12)NOT NULL,
--    edad					INT NOT NULL,
--    tipo_doc				ENUM('DNI','Carnet de extranjería') NOT NULL,
--    num_doc					VARCHAR(12) NOT NULL,
--    fecha_nacimiento		DATE NOT NULL
-- )ENGINE = INNODB;

-- CREATE TABLE usuarios(

-- 	id_usuario		INT AUTO_INCREMENT PRIMARY KEY,
--    nomuser			VARCHAR(30) UNIQUE,
--    passuser		VARCHAR(255),
--    id_persona		INT NOT NULL,  
    
--    FOREIGN KEY (id_persona) REFERENCES personas(id_persona)

-- )ENGINE = INNODB;


CREATE TABLE marcas(

	idmarca		INT AUTO_INCREMENT PRIMARY KEY,
  nommarca		VARCHAR(30) NOT NULL

)ENGINE = INNODB;

INSERT INTO marcas (nom_marca)values
('Samsung'),
('Xiaomi'),
('Huawei');
SELECT * FROM marcas;


CREATE TABLE categoria(

	idcategoria			          INT AUTO_INCREMENT PRIMARY KEY,
	nomcategoria			          VARCHAR(20) NOT NULL
	
)ENGINE = INNODB;


INSERT INTO categoria(nomcategoria)VALUES
('Smartphone'),
('Tablet');
SELECT * FROM categoria;



CREATE TABLE producto(

	  idproducto				        INT AUTO_INCREMENT PRIMARY KEY,
    nomproducto			        VARCHAR(50) NOT NULL,
    modeloproducto			      VARCHAR(30) NOT NULL,
    descripcionproducto	    VARCHAR(255) NOT NULL,

    memoriagb				        INT NOT NULL,
    ramgb					          INT NOT NULL,
    procesador				        VARCHAR(30),

    precioproducto			      DECIMAL(5.2) NOT NULL,
    cantidadproducto		      INT NOT NULL,
    imageproducto			      VARCHAR(255) NOT NULL,
    disponibilidadproducto	  BOOLEAN DEFAULT TRUE,

    idcategoria              INT NOT NULL,
    idmarca				          INT NOT NULL,


    FOREIGN KEY (idmarca) REFERENCES marcas(idmarca)

)ENGINE =INNODB;


INSERT INTO producto (nom_producto, modelo_producto, descripcion_producto, memoria_gb, ram_gb, procesador, precio_producto, cantidad_producto, image_producto,id_categoria, id_marca) VALUES
('Galaxy S23', 'SM-G980F', 'Smartphone de gama alta con cámara de 108MP', 128, 8, 'Exynos 2100', 999.99, 50, 'galaxy_s23.jpg', 'Samsung',1),
('Xiaomi Mi 11', 'M2011K2C', 'Smartphone con pantalla AMOLED 120Hz', 128, 8, 'Snapdragon 888', 749.99, 100, 'xiaomi_mi11.jpg', 'Xiaomi',1),
('Huawei P40 Pro', 'ELS-NX9', 'Smartphone con cámara Leica de 50MP', 256, 8, 'Kirin 990', 899.99, 30, 'huawei_p40pro.jpg', 'Huawei',1),
('Samsung Galaxy A52', 'SM-A525F', 'Smartphone de gama media con pantalla Super AMOLED', 128, 6, 'Snapdragon 720G', 349.99, 200, 'galaxy_a52.jpg', 'Samsung',1),
('Xiaomi Redmi Note 10', 'M2101K7AG', 'Smartphone económico con pantalla AMOLED', 64, 4, 'Snapdragon 678', 199.99, 150, 'redmi_note10.jpg', 'Xiaomi',1),
('Huawei Mate 40 Pro', 'NOH-NX9', 'Smartphone premium con cámara de 50MP y 5G', 256, 8, 'Kirin 9000', 1199.99, 25, 'huawei_mate40pro.jpg', 'Huawei',1);
SELECT * FROM producto;



