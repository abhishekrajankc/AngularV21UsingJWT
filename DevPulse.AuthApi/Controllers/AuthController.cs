using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly string? key;

    public AuthController(IConfiguration config)
    {
        key = config["Jwt:Key"];
    }

    [HttpPost("login")]
    public IActionResult Login(LoginRequest request)
    {
        if (request.Username != "admin" || request.Password != "123")
            return Unauthorized("Invalid credentials");

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, request.Username),
            new Claim(ClaimTypes.Role, "Admin")
        };
        

        var securityKey = new SymmetricSecurityKey(Convert.FromBase64String(key));
        var creds = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(5),
            signingCredentials: creds
        );

        return Ok(new
        {
            token = new JwtSecurityTokenHandler().WriteToken(token)
        });
    }

    [HttpGet("secure")]
    [Microsoft.AspNetCore.Authorization.Authorize]
    public IActionResult Secure()
    {
        return Ok("You are authenticated!");
    }
}

public class LoginRequest
{
    public string Username { get; set; }
    public string Password { get; set; }
}