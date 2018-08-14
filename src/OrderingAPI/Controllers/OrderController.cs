using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace OrderingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        [HttpPost]
        public async Task Post(string value)
        {
            var random = new Random();
            
            await Task.Delay(random.Next(1, 5) * 1000);

            var magicNumber = random.Next(0, 100);
            if (magicNumber <= 80)
                throw new InvalidOperationException();
        }
    }
}
