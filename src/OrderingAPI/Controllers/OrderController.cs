using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace OrderingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        // GET api/order
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new[] { "value1", "value2" };
        }

        // POST api/order
        [HttpPost]
        public void Post(string value)
        {
            var random = new Random();
            var magicNumber = random.Next(0, 100);

            if(magicNumber <= 80)
                throw new InvalidOperationException();

        }

    }
}
