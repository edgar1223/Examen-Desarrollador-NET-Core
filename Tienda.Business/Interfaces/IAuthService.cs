using Tienda.Entities;
public interface IAuthService
{
    string Login(string nombre, string contraseña);
    void RegistrarCliente(Cliente cliente);
}
