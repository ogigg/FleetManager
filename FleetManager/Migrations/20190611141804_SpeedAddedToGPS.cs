using Microsoft.EntityFrameworkCore.Migrations;

namespace FleetManager.Migrations
{
    public partial class SpeedAddedToGPS : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Speed",
                table: "GpsCoordinateses",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Speed",
                table: "GpsCoordinateses");
        }
    }
}
