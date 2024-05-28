const ContactForm = () => {
  // STATE CHANGE VARIABLES
  const [first, setFirst] = React.useState(true);
  const [last, setLast] = React.useState(true);
  const [email, setEmail] = React.useState(true);
  const [radio, setRadio] = React.useState(true);
  const [msg, setMsg] = React.useState(true);
  const [check, setCheck] = React.useState(true);
  const [complete, setComplete] = React.useState(false);

  // HANDLE SUBMIT CALLBACK FUNCTION
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());

    if (!formJson["firstName"]) {
      setFirst(false);
    } else {
      setFirst(true);
    }

    if (!formJson["lastName"]) {
      setLast(false);
    } else {
      setLast(true);
    }

    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formJson["email"])
    ) {
      setEmail(false);
    } else {
      setEmail(true);
    }

    if (!formJson["radioq"]) {
      setRadio(false);
    } else {
      setRadio(true);
    }

    if (!formJson["msg"]) {
      setMsg(false);
    } else {
      setMsg(true);
    }
    if (!formJson["check"]) {
      setCheck(false);
    } else {
      setCheck(true);
    }

    if (
      formJson["firstName"] &&
      formJson["lastName"] &&
      formJson["email"] &&
      formJson["radioq"] &&
      formJson["msg"] &&
      formJson["check"]
    ) {
      let entries = document.getElementsByClassName("form-control");
      for (let i = 0; i < entries.length; i++) {
        entries[i].value = "";
      }
      const radios = document.getElementById(formJson["radioq"]);
      radios.classList.remove("checked");
      document.getElementById("radio1").checked = false;
      document.getElementById("radio2").checked = false;

      document.getElementsByClassName("checking")[0].checked = false;

      setComplete(true);
      setTimeout(() => {
        setComplete(false);
      }, 5000);
    }
  };

  // HANDLE CLICK CALLBACK FUNCTION
  const handleClick = (vals) => {
    console.log(vals.target.value);
    if (vals.target.value == "general") {
      document.getElementById("general").classList.add("checked");
      document.getElementById("support").classList.remove("checked");
    } else {
      document.getElementById("support").classList.add("checked");
      document.getElementById("general").classList.remove("checked");
    }
  };

  return (
    <div className="holder">
      <h1>Contact Us</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="person">
          <div className="mb-3">
            <label className="form-label">
              First Name <span className="astar">*</span>
            </label>
            <input
              name="firstName"
              type="text"
              className={`form-control ${first ? "" : "invalid-box"}`}
              id="exampleFormControlInput1"
            />
            <div className={first ? "none" : "invalid"}>
              This field is required
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Last Name <span className="astar">*</span>
            </label>
            <input
              name="lastName"
              type="text"
              className={`form-control ${last ? "" : "invalid-box"}`}
              id="exampleFormControlInput1"
            />
            <div className={last ? "none" : "invalid"}>
              This field is required
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Email Address <span className="astar">*</span>
          </label>
          <input
            name="email"
            type="email"
            className={`form-control ${email ? "" : "invalid-box"}`}
            id="exampleFormControlInput1"
          />
          <div className={email ? "none" : "invalid"}>
            Please enter a valid email address
          </div>
        </div>

        <div className="query">
          <label>
            Query Type <span className="astar">*</span>
          </label>
          <div className="query-opts">
            <div id="general" className="form-check form-check-inline query-r">
              <input
                onClick={(props) => handleClick(props)}
                type="radio"
                id="radio1"
                name="radioq"
                className="query-radio"
                value="general"
              />
              <label className="form-check-label">General Enquiry</label>
            </div>
            <div id="support" className="form-check form-check-inline query-r">
              <input
                onClick={(props) => handleClick(props)}
                type="radio"
                id="radio2"
                name="radioq"
                className="query-radio"
                value="support"
              />
              <label className="form-check-label">Support Request</label>
            </div>
          </div>
          <div className={radio ? "none" : "invalid"}>
            Please select a query type
          </div>
        </div>
        <div className="msg-block">
          <label>
            Message <span className="astar">*</span>
          </label>
          <textarea
            className={`form-control msg-txt ${msg ? "" : "invalid-box"}`}
            name="msg"
            id="floatingTextarea2"
          ></textarea>
          <div className={msg ? "none" : "invalid"}>This field is required</div>
        </div>
        <div className="checkbox">
          <div className="form-check">
            <input
              name="check"
              className="form-check-input checking"
              type="checkbox"
            />
            <label className="form-check-label consent">
              I consent to being contacted by the team{" "}
              <span className="astar">*</span>
            </label>
          </div>
          <div className={check ? "none" : "invalid"}>
            To submit this form please consent to being contacted
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <div className={`show-toast ${complete ? "" : "none"}`}>
        <p className="toast-head">
          <i className="fa-regular fa-circle-check"></i> Message Sent!
        </p>
        <p className="toast-txt">
          Thanks for completing the form. We'll be in touch soon!
        </p>
      </div>
    </div>
  );
};

ReactDOM.render(<ContactForm />, document.getElementById("root"));
