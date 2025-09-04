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

call sp_AgregarPalabra('ADRIAN', 'Es un felino salvaje conocido por su velocidad.', 'Tiene manchas en su pelaje.', 'Habita principalmente en África y algunas partes de Asia.');
call sp_AgregarPalabra('GUITARRA', 'Es un instrumento musical de cuerda.', 'Puede ser acústica o eléctrica.', 'Se toca con los dedos o con una púa.');
call sp_AgregarPalabra('TELEFONO', 'Dispositivo utilizado para comunicarse a distancia.', 'Puede ser fijo o móvil.', 'Inventado por Alexander Graham Bell.');
call sp_AgregarPalabra('INTERNET', 'Red global de computadoras interconectadas.', 'Permite el acceso a información y comunicación.', 'Se utiliza para navegar, enviar correos y ver videos.');
call sp_AgregarPalabra('AUTOMOVIL', 'Vehículo de transporte con motor.', 'Generalmente tiene cuatro ruedas.', 'Se conduce con un volante y pedales.');

call sp_AgregarPalabra('Ahorcado', 'Juego dinámico.', 'Debes de adivinar la palabra.', 'Es un muñeco que se va completando.');

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