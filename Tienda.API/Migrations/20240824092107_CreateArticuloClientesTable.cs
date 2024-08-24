using Microsoft.EntityFrameworkCore.Migrations;

namespace Tienda.API.Migrations
{
    public partial class CreateArticuloClientesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArticulosClientes_Articulos_ArticuloId",
                table: "ArticulosClientes");

            migrationBuilder.DropForeignKey(
                name: "FK_ArticulosClientes_Clientes_ClienteId",
                table: "ArticulosClientes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ArticulosClientes",
                table: "ArticulosClientes");

            migrationBuilder.RenameTable(
                name: "ArticulosClientes",
                newName: "ArticuloClientes");

            migrationBuilder.RenameIndex(
                name: "IX_ArticulosClientes_ClienteId",
                table: "ArticuloClientes",
                newName: "IX_ArticuloClientes_ClienteId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ArticuloClientes",
                table: "ArticuloClientes",
                columns: new[] { "ArticuloId", "ClienteId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ArticuloClientes_Articulos_ArticuloId",
                table: "ArticuloClientes",
                column: "ArticuloId",
                principalTable: "Articulos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ArticuloClientes_Clientes_ClienteId",
                table: "ArticuloClientes",
                column: "ClienteId",
                principalTable: "Clientes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArticuloClientes_Articulos_ArticuloId",
                table: "ArticuloClientes");

            migrationBuilder.DropForeignKey(
                name: "FK_ArticuloClientes_Clientes_ClienteId",
                table: "ArticuloClientes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ArticuloClientes",
                table: "ArticuloClientes");

            migrationBuilder.RenameTable(
                name: "ArticuloClientes",
                newName: "ArticulosClientes");

            migrationBuilder.RenameIndex(
                name: "IX_ArticuloClientes_ClienteId",
                table: "ArticulosClientes",
                newName: "IX_ArticulosClientes_ClienteId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ArticulosClientes",
                table: "ArticulosClientes",
                columns: new[] { "ArticuloId", "ClienteId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ArticulosClientes_Articulos_ArticuloId",
                table: "ArticulosClientes",
                column: "ArticuloId",
                principalTable: "Articulos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ArticulosClientes_Clientes_ClienteId",
                table: "ArticulosClientes",
                column: "ClienteId",
                principalTable: "Clientes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
