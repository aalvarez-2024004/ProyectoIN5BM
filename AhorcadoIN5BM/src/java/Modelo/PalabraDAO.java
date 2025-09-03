package Modelo;

import Config.Conexion;
import Modelo.Palabra;
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
    public List<Palabra> listar() {
        List<Palabra> lista = new ArrayList<>();
        String sql = "call sp_ListarPalabras";
        
        try {
            con = cn.Conexion();
            ps = con.prepareStatement(sql);
            rs = ps.executeQuery();
            
            while (rs.next()) {
                Palabra p = new Palabra();
                p.setcodigoPalabra(rs.getInt("codigoPalabra"));
                p.setPalabra(rs.getString("palabra"));
                p.setPista1(rs.getString("pista1"));
                p.setPista2(rs.getString("pista2"));
                p.setPista3(rs.getString("pista3"));
                lista.add(p);
            }
        } catch (SQLException e) {
            System.out.println("Error al listar palabras: " + e.getMessage());
        }
        return lista;
    }
    
    // Obtener una palabra aleatoria
    public Palabra obtenerAleatoria() {
        String sql = "Call sp_PalabraAleatoria";
        Palabra p = null;
        
        try {
            con = cn.Conexion();
            ps = con.prepareStatement(sql);
            rs = ps.executeQuery();
            
            if (rs.next()) {
                p = new Palabra();
                p.setcodigoPalabra(rs.getInt("codigoPalabra"));
                p.setPalabra(rs.getString("palabra"));
                p.setPista1(rs.getString("pista1"));
                p.setPista2(rs.getString("pista2"));
                p.setPista3(rs.getString("pista3"));
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return p;
    }
}
