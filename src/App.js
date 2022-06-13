import "./App.css";
import { useEffect, useState } from "react";
import firebase from "./firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

function App() {
  const [schools, setSchools] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const ref = firebase.firestore().collection("schools");
  console.log(ref);

  // ADD FUNCTION
  function addSchool(newSchool) {
    ref
      //.doc() use if for some reason you want that firestore generates the id
      .doc(newSchool.id)
      .set(newSchool)
      .catch((err) => {
        console.error(err);
      });
  }

  //DELETE FUNCTION
  function deleteSchool(school) {
    ref
      .doc(school.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }

  // EDIT FUNCTION
  function editSchool(updatedSchool) {
    setLoading();
    ref
      .doc(updatedSchool.id)
      .update(updatedSchool)
      .catch((err) => {
        console.error(err);
      });
  }

  const getSchools = () => {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.uuid });
      });
      setSchools(items);
      setLoading(false);
    });
  };

  useEffect(() => {
    getSchools();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Form>
        <h1 className="header">Schools</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            as="textarea"
            placeholder="description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={() => addSchool({ title, desc, id: uuidv4() })}
        >
          Submit
        </Button>
      </Form>
      <hr />
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : null}
      {schools &&
        schools.map((school) => {
          return (
            <div key={school.id}>
              <h2>{school.title}</h2>
              <p>{school.desc}</p>
              <Button variant="danger" onClick={() => deleteSchool(school)}>
                X
              </Button>
              <Button
                variant="warning"
                onClick={() =>
                  editSchool({ title: school.title, desc, id: school.id })
                }
              >
                Edit
              </Button>
            </div>
          );
        })}
    </div>
  );
}

export default App;
