using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

[ApiController] 
[Route("api/[controller]")]
public class ContainerController: ControllerBase
{
    [HttpPost]

    public IActionResult Post([FromBody] Container container)
    {
        if (container == null || string.IsNullOrEmpty(container.container))
            return BadRequest("Dados inválidos!");

        var caminho = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "JSON", "dados.json");
        var json = System.IO.File.ReadAllText(caminho);
        var patio = JsonSerializer.Deserialize<Patio>(json);

        if (patio == null)
            patio = new Patio { data = new List<Container>() };
        patio.data.Add(container);

        var novoJson = JsonSerializer.Serialize(patio, new JsonSerializerOptions { WriteIndented = true });
        System.IO.File.WriteAllText(caminho, novoJson);

        return Ok(container);
    }
}

