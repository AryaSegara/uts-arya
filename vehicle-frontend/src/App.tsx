import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CheckCircle, Edit, Plus, Trash2, XCircle } from "lucide-react";
import Like from "./components/Like";

export interface Car {
  id: number;
  merek: string;
  model: string;
  year: string;
  color: string;
  price: number;
  image: string;
}

function App() {
  const [car, setCar] = useState<Car[]>([]);

  const [showAdd, setShowAdd] = useState(false);
  const [editedCar, setEditedCar] = useState(false);
  const [search, setSearch] = useState("");
  const [merek, setMerek] = useState("");
  const [sortBy, setSortBy] = useState<keyof Car>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [newCar, setNewCar] = useState<Partial<Car>>({
    merek: "",
    model: "",
    price: 0,
    color: "",
    year: "",
    image: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/cars")
      .then((response) => response.json())
      .then((data) => setCar(data));
  });

  const filterData = [...car]
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    })
    .filter((data: Car) => {
      return (
        data.model.toLowerCase().includes(search) && data.merek.includes(merek)
      );
    });

  const handleEdit = () => {
    // e.preventDefault();
    fetch("http://localhost:8080/api/cars", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCar),
    })
      .then((response) => response.json())
      .then((data) => {
        setCar(data);
        // setEditedCar(false);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCar({ ...newCar, [e.target.name]: e.target.value });
  };

  const handleShowEdit = (car: Car) => {
    setNewCar(car);
    setEditedCar(true);
  };

  const handleDelete = (id: number) => {
    const confirmation = window.confirm(
      `Apakah Anda yakin ingin menghapus Car Ini?`
    );
    if (confirmation) {
      fetch(`http://localhost:8080/api/cars/${id}`, {
        method: "DELETE",
      }).then((response) => {
        if (response.ok) {
          setCar(car.filter((b) => b.id !== id));
        }
      });
    }
  };

  return (
    <>
      <Header />
      <header className="flex flex-wrap justify-between items-center bg-gradient-to-r from-gray-700 to-gray-300 gap-8 ">
        <div className="flex py-4">
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center space-x-2 transform transition-transform duration-300 hover:scale-105"
          >
            <Plus size={18} />
            <span>Add</span>
          </button>
        </div>

        <label className="flex items-center gap-1 grow">
          <h1 className="font-bold">Cari:</h1>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 p-2 text-sm rounded-lg outline-blue-400 border-2 border-solid border-gray-500"
          />
        </label>

        <section>
          <label className="flex items-center gap-1">
            <h1 className="font-bold">Merek:</h1>
            <select
              value={merek}
              onChange={(e) => setMerek(e.target.value)}
              className="h-9 p-2 text-sm rounded-lg outline-blue-400 border-2 border-solid border-gray-500"
            >
              <option value="">Semua</option>
              <option value="Toyota">Toyota</option>
              <option value="Daihatsu">Daihatsu</option>
              <option value="Honda">Honda</option>
              <option value="BMW">BMW</option>
            </select>
          </label>
        </section>

        <section>
          <label className="flex items-center gap-1">
            <h1 className="font-bold">Urutkan:</h1>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as keyof Car)}
              className="h-9 p-2 text-sm rounded-lg outline-blue-400 border-2 border-solid border-gray-500"
            >
              <option value="id">Normal</option>
              <option value="model">Model</option>
              <option value="price">Price</option>
            </select>
          </label>
        </section>

        <section>
          <label className="flex items-center gap-1">
            <h1 className="font-bold">Urutkan:</h1>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              className="h-9 p-2 text-sm rounded-lg outline-blue-400 border-2 border-solid border-gray-500"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
        </section>
      </header>

      <div className="py-8 bg-gradient-to-r from-gray-700 to-gray-300 flex items-center justify-center">
        <div className="flex justify-between bg-white shadow-xl rounded-2xl p-6 gap-6 transform transition-all duration-300 ease-in-out">
          {showAdd && (
            <form
              className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md"
              onSubmit={(e : React.FormEvent) => {
                e.preventDefault();
                fetch("http://localhost:8080/api/cars", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(newCar),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    setCar([...car, data]);
                    setShowAdd(false);
                  });
              }}
            >
              <div className="mb-2">
                <label htmlFor="model" className="block text-gray-700">
                  Input Model Car
                </label>
                <input
                  type="text"
                  value={newCar.model}
                  name="name"
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  onChange={(e) =>
                    setNewCar({ ...newCar, model: e.target.value })
                  }
                  required
                  autoFocus
                />
              </div>

              <div className="mb-2">
                <label htmlFor="image" className="block text-gray-700">
                  Input Url Gambar Car
                </label>
                <input
                  type="text"
                  value={newCar.image}
                  name="image"
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  onChange={(e) =>
                    setNewCar({ ...newCar, image: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-2">
                <label htmlFor="price" className="block text-gray-700">
                  Input Harga Car
                </label>
                <input
                  type="number"
                  value={newCar.price}
                  name="price"
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  onChange={(e) =>
                    setNewCar({ ...newCar, price: parseInt(e.target.value) })
                  }
                  required
                />
              </div>

              <div className="mb-2">
                <label htmlFor="year" className="block text-gray-700">
                  Input Tahun Car
                </label>
                <input
                  type="text"
                  value={newCar.year}
                  name="year"
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  onChange={(e) =>
                    setNewCar({ ...newCar, year: e.target.value })
                  }
                  required
                  autoFocus
                />
              </div>

              <div className="mb-2">
                <label htmlFor="color" className="block text-gray-700">
                  Input Color Car
                </label>
                <input
                  type="text"
                  value={newCar.color}
                  name="name"
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  onChange={(e) =>
                    setNewCar({ ...newCar, color: e.target.value })
                  }
                  required
                  autoFocus
                />
              </div>

              <select
                onChange={(e) => {
                  setNewCar({ ...newCar, merek: e.target.value });
                }}
              >
                <option value="">Plih</option>
                <option value="Toyota">Toyota</option>
                <option value="Daihatsu">Daihatsu</option>
                <option value="Honda">Honda</option>
                <option value="BMW">BMW</option>
              </select>

              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="mx-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2 transform transition-transform duration-300 hover:scale-105"
                >
                  <CheckCircle size={18} />
                  <span>Submit</span>
                </button>
                <button
                  type="button"
                  className="mx-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center space-x-2 transform transition-transform duration-300 hover:scale-105"
                  onClick={() => setShowAdd(false)}
                >
                  <XCircle size={18} />
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          )}

          {editedCar && (
            <form
              className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md"
              onSubmit={(e : React.FormEvent) => {
                e.preventDefault();
                handleEdit();
              }}
            >
              <div className="mb-2">
                <label htmlFor="model" className="block text-gray-700">
                  Input Model Film
                </label>
                <input
                  type="text"
                  name="model"
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  value={newCar.model}
                  onChange={handleChange}
                  autoFocus
                />
              </div>
              <div className="mb-2">
                <label htmlFor="image" className="block text-gray-700">
                  Input Url Gambar Car
                </label>
                <input
                  type="text"
                  name="image"
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  value={newCar.image}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="price" className="block text-gray-700">
                  Input Harga Car
                </label>
                <input
                  type="number"
                  name="price"
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  value={newCar.price}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label htmlFor="year" className="block text-gray-700">
                  Input Tahun Car
                </label>
                <input
                  type="text"
                  name="year"
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  value={newCar.year}
                  onChange={handleChange}
                  autoFocus
                />
              </div>

              <div className="mb-2">
                <label htmlFor="color" className="block text-gray-700">
                  Input Color Car
                </label>
                <input
                  type="text"
                  name="color"
                  className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  value={newCar.color}
                  onChange={handleChange}
                  autoFocus
                />
              </div>

              <select
                onChange={(e) => {
                  setNewCar({
                    ...newCar,
                    merek: e.target.value,
                  });
                }}
              >
                <option value="">Pilih</option>
                <option value="Toyota">Toyota</option>
                <option value="Daihatsu">Daihatsu</option>
                <option value="Honda">Honda</option>
                <option value="BMW">BMW</option>
              </select>

              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  className="mx-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2 transform transition-transform duration-300 hover:scale-105"
                >
                  <CheckCircle size={18} />
                  <span>Submit</span>
                </button>
                <button
                  type="button"
                  className="mx-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center space-x-2 transform transition-transform duration-300 hover:scale-105"
                  onClick={() => setEditedCar(false)}
                >
                  <XCircle size={18} />
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          )}

          {filterData.map((stud) => (
            <div
              key={stud.id}
              className="bg-gray-400 rounded-lg p-4 shadow-lg hover:shadow-xl transform transition-shadow duration-300"
            >
              <div className="flex space-x-4 mb-4 items-center justify-between text-2xl font-semibold text-gray-700">
                Model: {stud.model}
                <Like/>

              </div>

              <div className="text-gray-600">
                <img
                  className="ml-2 h-64 w-72 rounded-lg"
                  src={stud.image}
                  alt=""
                  // width={200}
                  // height={200}
                />
              </div>

              <span className="text-gray-600 font-bold mt-6">
                Harga : Rp{" "}
                {stud.price.toLocaleString("id-ID", {
                  // styles: "currency",
                  currency: "IDR",
                })}
              </span>

              
              <div className="text-gray-600 font-bold">
                  Merek : {stud.merek}
                </div>

                <div className="text-gray-600 font-bold">
                  Tahun  : {stud.year}
                </div>

                <div className="text-gray-600 font-bold">
                  Color  : {stud.color}
                </div>

              <div className="mt-4 flex space-x-2 justify-between">
                <button
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transform transition-transform duration-300 hover:scale-105"
                  onClick={() => handleShowEdit(stud)}
                >
                  <Edit size={18} className="mr-2" />
                  Update
                </button>

                <button
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transform transition-transform duration-300 hover:scale-105"
                  onClick={() => handleDelete(stud.id)}
                >
                  <Trash2 size={18} className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
