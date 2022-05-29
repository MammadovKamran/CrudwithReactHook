
const vacancies = [
    { id: 1, position: "front-developer", salary: 200 },
    { id: 2, position: "back-developer", salary: 200 },
    { id: 3, position: "mobile-developer", salary: 200 },
    { id: 4, position: "robot-developer", salary: 200 },
  ];
  
  const url = "http://localhost:3000/users";
  
  const App = () => {
  
    
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [vacantionId, setVacantionId] = useState("");
  
    const [employee, setEmployee] = useState([]);
  
    const isDisabled = [name, surname, email, vacantionId].every(Boolean);
  
    const renderedOptions = vacancies.map((v) => {
      return (
        <option value={v.id} key={v.id}>
          {v.position}
        </option>
      );
    });
  
    let empView =
      employee.length > 0 &&
      employee.map((emp) => {
        return (
          <Employee
            propsEmployee={emp}
            vacantionName={
              vacancies.find((v) => v.id === parseInt(emp.vacantionId)).position
            }
          />
        );
      });
  
    const handleFetchData = async () => {
      try {
        let request = await fetch(url);
        return await request.json();
      } catch (error) {
        console.error(error);
      }
    };
  
    const handlePostData = async (paramsUser) => {
      if (paramsUser) {
        setEmployee((pre) => {
          let copy = [...pre];
          copy.push(paramsUser);
          return copy;
        });
  
        try {
          let request = await fetch(url, {
            method: "POST",
            body: JSON.stringify(paramsUser),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          });
          return await request.json();
        } catch (error) {
          throw new Error(error);
        }
      }
    };
  
    const handleSubmit = (e, callback) => {
      callback({
        name,
        surname,
        email,
        vacantionId,
        id: nanoid(),
      })
        .then((response) => {
          console.log(response);
          setName("");
          setSurname("");
          setEmail("");
          setVacantionId("");
        })
        .catch((err) => console.error(err));
  
      e.preventDefault();
    };
  
    useEffect(() => {
      handleFetchData().then((response) => {
        if (response && response.length > 0) {
          setEmployee(response);
        }
      });
    }, [setEmployee]);
  
    return (
      <div>
        <Container>
          <h1 className="px-4">Registration form</h1>
          <Row className="d-flex">
            <Form
              onSubmit={(e) => {
                return handleSubmit(e, handlePostData);
              }}
              className="d-flex flex-wrap"
              style={{ height: "140px" }}
            >
              <Col md="4" style={{ height: "140px" }}>
                <FormGroup className="px-4">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="px-4">
                  <Label htmlFor="surname">Surname</Label>
                  <Input
                    type="text"
                    id="surname"
                    name="surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="4" style={{ height: "140px" }}>
                <FormGroup className="px-4">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="text"
                    id="email"
                    name="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="px-4">
                  <Label htmlFor="vacancy">Vacancies</Label>
                  <Input
                    type="select"
                    name="vacancy"
                    id="vacancy"
                    value={vacantionId}
                    onChange={(e) => {
                      return setVacantionId(e.target.value);
                    }}
                  >
                    <option>Choose</option>
                    {renderedOptions}
                  </Input>
                </FormGroup>
              </Col>
  
              <Col md="4" style={{ height: "140px" }}>
                <div
                  className="w-100"
                  style={{
                    overflowY: "scroll",
                    height: "210px",
                    marginTop: "24px",
                  }}
                >
                  {employee.length > 0 ? (
                    <ListGroup style={{ height: "inherit" }}>{empView}</ListGroup>
                  ) : (
                    <Toast
                      className="w-100"
                      style={{
                        height: "calc(100% - 24px)",
                        marginTop: "24px",
                      }}
                    >
                      <ToastHeader>no candidate</ToastHeader>
                      <ToastBody>interview is continuing</ToastBody>
                    </Toast>
                  )}
                </div>
              </Col>
              <Col md="8">
                <FormGroup className="px-4 mb-0 mt-4">
                  <Label></Label>
                  <Button
                    color="primary"
                    outline
                    block
                    disabled={!isDisabled}
                    type="submit"
                  >
                    Add
                  </Button>
                </FormGroup>
              </Col>
            </Form>
          </Row>
        </Container>
      </div>
    );
  };
  
  export default App;
  //////////////////////////////////////////////////////////////////////////////
  
  const Employee = ({ propsEmployee, vacantionName }) => {
    return (
      <>
        <ListGroupItem
          className="d-flex justify-content-between"
          key={propsEmployee.id}
        >
          {propsEmployee.name}
          <Badge color="danger">{vacantionName}</Badge>
        </ListGroupItem>
      </>
    );
  };
  
  export default Employee;
  