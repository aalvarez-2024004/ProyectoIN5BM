drop database if exists DB_ahorcado;
create database DB_ahorcado;
use DB_ahorcado;

create table Palabras(
	codigoPalabra int auto_increment,
    palabra varchar(50) not null,
    pista1 varchar(100),
    pista2 varchar(100),
    pista3 varchar(100),
    primary key PK_codigoPalabra(codigoPalabra)
);

Delimiter $$
	create procedure sp_AgregarPalabra(
		in palabra varchar(50),
		in pista1 varchar(100),
		in pista2 varchar(100),
		in pista3 varchar(100))
	begin
		insert into Palabras (palabra, pista1, pista2, pista3)
			values (palabra, pista1, pista2, pista3);
	end $$
Delimiter ;

call sp_AgregarPalabra('LEOPARDO', 'img/leopardo1.jpg', 'img/leopardo2.jpg', 'img/leopardo3.jpg');
call sp_AgregarPalabra('GUITARRA', 'img/guitarra1.jpg', 'img/guitarra1.jpg', 'img/guitarra1.jpg');
call sp_AgregarPalabra('TELEFONO', 'img/telefono1.jpg', 'img/telefono1.jpg', 'img/telefono1.jpg');
call sp_AgregarPalabra('INTERNET', 'img/internet1.jpg', 'img/internet1.jpg', 'img/internet1.jpg');
call sp_AgregarPalabra('AUTOMOVIL', 'img/automovil1.jpg', 'img/automovil1.jpg', 'img/automovil1.jpg');

Delimiter $$
	create procedure sp_ListarPalabras()
		begin
			select palabra, pista1, pista2, pista3
			from Palabras;
		end $$
Delimiter ;

call sp_ListarPalabras();

Delimiter $$
	create procedure sp_PalabraAleatoria()
		begin
			select palabra, pista1, pista2, pista3
			from Palabras order by rand() limit 1;
		end $$
Delimiter ;
call sp_PalabraAleatoria();