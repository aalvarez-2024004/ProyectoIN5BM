package Modelo;

import Config.Conexion;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;

public class UsuarioDAO {

    Conexion cn = new Conexion();
    Connection con;
    CallableStatement cs;
    ResultSet rs;

    // Registrar usuario
    public boolean agregarUsuario(Usuario u) {
        boolean agregar = false;
        
        try {
            con = cn.Conexion();
            cs = con.prepareCall("{call sp_AgregarUsuario(?, ?)}");
            cs.setString(1, u.getUsuario());
            cs.setString(2, u.getContraseña());
            cs.executeUpdate();
            agregar = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return agregar;
    }

    // Validar login
    public Usuario validarUsuario(String usuario, String contraseña) {
        Usuario user = null;
        
        try {
            con = cn.Conexion();
            cs = con.prepareCall("{call sp_ValidarUsuario(?, ?)}");
            cs.setString(1, usuario);
            cs.setString(2, contraseña);
            rs = cs.executeQuery();

            if (rs.next()) {
                user = new Usuario();
                user.setUsuario(rs.getString("usuario"));
                user.setContraseña(rs.getString("contraseña"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return user;
    }
}
