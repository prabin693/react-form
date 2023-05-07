import { useRef,useEffect,useState } from "react"
import { faCheck, faTimes,faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"



const USER_REGEX = /^[a-zA-Z0-9]{4,16}$/
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,24})$/


export const Register = () => {
    const userRef = useRef();
    const passRef = useRef();
    const errRef = useRef();

    const [user,setUser] = useState("")
    const [validName,setValidName] = useState(false)
    const [userFocus,setUserFocus] = useState(false)

    const[pass,setPass] = useState("")
    const [validPass,setValidPass] = useState(false)
    const [passFocus,setPassFocus] = useState(false)

    const [matchpwd,setMatchpwd] = useState("")
    const [validMatch,setValidMatch] = useState(false)
    const [matchFocus,setMatchFocus] = useState(false)

    const[errMsg,setErrMsg] = useState("")
    const [sucess,setSucess] = useState("")


    useEffect(() =>{
        userRef.current.focus()
    },[])

    useEffect(() =>{
        const result = USER_REGEX.test(user);
        console.log(result)
        console.log(user)
        setValidName(result);
    },[user])

    useEffect(() =>{
        const result = PASS_REGEX.test(pass);
        console.log(result)
        console.log(pass)
        setValidPass(result);
        const match = pass === matchpwd;
        },[pass,matchpwd])


    useEffect(() => {
        setErrMsg('');
    },[user,pass,matchpwd])


    const handleSubmit = async(e) =>{
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PASS_REGEX.test(pass);
        if(!v1 || !v2){
            setErrMsg("Invalid username or password")
            return;
        }
            console.log(user,pass)
            setSucess("Registration sucessful")

    }
  
  
    return (
        <>
        {sucess?(
        <section>
            <h1>Registration Sucessful</h1>
            <p>
                <a href ="#">Sign In</a>
            </p>
        </section>
        ):(
        <section>
   <p ref={errRef} className={errMsg ? "errmsg":"offScreen"} aria-live="assertive">{errMsg}</p>
   <h1>Register</h1>
   <form onSubmit={handleSubmit}>
   <label htmlFor="username">Username:
   <span className={validName ? "valid":"invalid"}>
    <FontAwesomeIcon icon={faCheck}/>
    </span>
   </label>


    <input
    type="text"
    id="username"
    ref={userRef}
    autoComplete="off"
    onChange={(e) => setUser(e.target.value)}
    required
    area-invalid={!validName? "false":"true"}
    aria-describedby="uidnote"
    onFocus ={() => setUserFocus(true)}
    onBlur ={() => setUserFocus(false)}
    />
    <p id="uuidnote" className ={userFocus && user && !validName ? "instructions":"offScreen"}>
        <FontAwesomeIcon icon={faInfoCircle} aria-hidden="true" />
        4 to 16 characters, letters and numbers only<br/>
        No spaces, no special characters<br/>
        Letters ,numbers ,underScore and hyphen only

    </p>


    <label htmlFor="password">Password:
    <span className={validPass ? "valid":"invalid"}>
    <FontAwesomeIcon icon={faCheck}/>
    </span>
    </label>
    
    <input
    type="password"
    id="password"
    ref={passRef}
    autoComplete="off"
    onChange={(e) => setPass(e.target.value)}
    required
    area-invalid={!validPass? "false":"true"}
    aria-describedby="pwdnote"
    onFocus ={() => setPassFocus(true)}
    onBlur ={() => setPassFocus(false)}
    />
    <p id="pwdnote" className ={passFocus && pass && !validPass ? "instructions":"offScreen"}>
        <FontAwesomeIcon icon={faInfoCircle} aria-hidden="true" />
        8 to 24 characters, at least one uppercase letter, one lowercase letter, one number, and one special character<br/>
        No spaces, no special characters<br/>
        Letters ,numbers ,underScore and hyphen only<span aria-label="exclamation mark">!</span>
        <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
        <span aria-label="dollar sign">$</span> <span aria-label="percent sign">%</span>
    </p>

    <label htmlFor="matchpwd">Confirm Password:
    <span className={validMatch ? "valid":"invalid"}>
    <FontAwesomeIcon icon={faCheck}/>
    </span>
    </label>

    <input
    type="password"
    id="matchpwd"
    autoComplete="off"
    onChange={(e) => setMatchpwd(e.target.value)}
    required
    area-invalid={!validMatch? "false":"true"}
    aria-describedby="matchnote"
    onFocus ={() => setMatchFocus(true)}
    onBlur ={() => setMatchFocus(false)}
    />
    <p id="matchnote" className ={matchFocus && matchpwd && !validMatch ? "instructions":"offScreen"}>
        <FontAwesomeIcon icon={faInfoCircle} aria-hidden="true" />
        Must match password exactly
    </p>

  <button disabled={!validName || !validPass || !validMatch ? true: false}
  >Sign Up</button> 
    <p >
        Already registered? <br/>
        <span className="line">
            <a href ="#">Sign In</a>
        </span>
    </p>
    

    
    
   </form>

    </section>
        )}
    </>
  )
}
