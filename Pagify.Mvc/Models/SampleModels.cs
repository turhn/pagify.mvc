using System.Collections.Generic;

namespace Pagify.Mvc.Models
{
    public class SampleModelsRepository
    {
        public List<User> GetUsers()
        {
            return new List<User>
            {
                new User {UserId = 1, FirstName = "Lynne", LastName = "Contreras", UserName = "Contreras"},
                new User {UserId = 2, FirstName = "Janie", LastName = "Walter", UserName = "Walter"},
                new User {UserId = 3, FirstName = "Pratt", LastName = "Carey", UserName = "prattcarey"},
                new User {UserId = 4, FirstName = "Ester", LastName = "Kerr", UserName = "esterkerr"},
                new User {UserId = 5, FirstName = "Bernice", LastName = "Houston", UserName = "bernicehouston"},
                new User {UserId = 6, FirstName = "Welch", LastName = "Mcdonald", UserName = "welchmcdonald"},
                new User {UserId = 7, FirstName = "John", LastName = "Doe", UserName = "johndoe"},
                new User {UserId = 8, FirstName = "Mathew", LastName = "Alan", UserName = "mathewalan"},
                new User {UserId = 9, FirstName = "Ashton", LastName = "Mark", UserName = "ashtonmark"},
                new User {UserId = 10, FirstName = "Linus", LastName = "Hulix", UserName = "linushulix"},
                new User {UserId = 11, FirstName = "Boodiga", LastName = "Celt", UserName = "boodigacelt"},
                new User {UserId = 12, FirstName = "Terry", LastName = "Estrada", UserName = "terryestrada"},
                new User {UserId = 13, FirstName = "Janie", LastName = "Walter", UserName = "Walter"},
                new User {UserId = 14, FirstName = "Janie", LastName = "Walter", UserName = "Walter"},
                new User {UserId = 15, FirstName = "Janie", LastName = "Walter", UserName = "Walter"},
                new User {UserId = 16, FirstName = "Janie", LastName = "Walter", UserName = "Walter"},
                new User {UserId = 17, FirstName = "Janie", LastName = "Walter", UserName = "Walter"},
                new User {UserId = 18, FirstName = "Janie", LastName = "Walter", UserName = "Walter"},
                new User {UserId = 19, FirstName = "Janie", LastName = "Walter", UserName = "Walter"},
                new User {UserId = 20, FirstName = "Janie", LastName = "Walter", UserName = "Walter"},
                new User {UserId = 21, FirstName = "Janie", LastName = "Walter", UserName = "Walter"}
            };
        }

        public class User
        {
            public int UserId { get; set; }

            public string UserName { get; set; }

            public string FirstName { get; set; }

            public string LastName { get; set; }
        }
    }
}