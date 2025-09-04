package Modelo;

import Config.Conexion;
import Modelo.Palabra;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class PalabraDAO {
    
    Conexion cn = new Conexion();
    Connection con;
    PreparedStatement ps;
    ResultSet rs;
    
    // Listar todas las palabras
    public List<Palabra> listarPalabras() {
        List<Palabra> lista = new ArrayList<>();
        try {
            Conexion cn = new Conexion();
            Connection con = cn.Conexion();
            CallableStatement cs = con.prepareCall("{ call sp_ListarPalabras() }");
            ResultSet rs = cs.executeQuery();

            while (rs.next()) {
                lista.add(new Palabra(
                        rs.getString("palabra"),
                        rs.getString("pista1"),
                        rs.getString("pista2"),
                        rs.getString("pista3")
                ));
            }
            rs.close();
            cs.close();
            con.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return lista;
    }
    
    // Obtener una palabra aleatoria
    public Palabra obtenerPalabraAleatoria() {
        Palabra palabra = null;
        try {
            Conexion cn = new Conexion();
            Connection con = cn.Conexion();
            CallableStatement cs = con.prepareCall("{ call sp_PalabraAleatoria() }");
            ResultSet rs = cs.executeQuery();

            if (rs.next()) {
                palabra = new Palabra(
                        rs.getString("palabra"),
                        rs.getString("pista1"),
                        rs.getString("pista2"),
                        rs.getString("pista3")
                );
            }
            rs.close();
            cs.close();
            con.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return palabra;
    }
}
