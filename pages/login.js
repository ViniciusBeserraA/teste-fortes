  import styles from "../styles/Login.module.css"
  import { Typography, Card, CardContent, TextField, CardMedia, Button} from '@mui/material';
  import { useState } from 'react'
  import { setCookie } from 'cookies-next'
  import { useRouter } from 'next/router'


  export default function Login() {
    const [formData, setFormData] = useState({
      user:'',
      password:''
    })
    const [error, setError] = useState('')
    const router = useRouter()

    const handleFormLoginEdit = (event, field) => { 
      setFormData({...formData, [field]: event.target.value})
    }

    const handleFormLogin = async (e) => {
      try {
        e.preventDefault()
        const response = await fetch('../api/users/login', {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json'
          }
        })
    
        const json = await response.json()
        
        if (response.status !== 200) throw new Error(json)
        setCookie('authorization', json)
        router.push('/')
      } catch (err) {
        setError(err.message)
      }
    };

      return (
        <div className={styles.background}>
        <Card>
            <CardMedia className={styles.cardMedia}>
              <img
                src="https://grupofortes.com.br/wp-content/uploads/2022/10/logo-fortes-tecnologia-1-1.gif"
                alt="Login Image"
                height={65}
                className={styles.img}
              />
            </CardMedia>
            <Typography className={styles.title} id="modal-modal-title" variant="h7" component="h3">
              Sistema de Usuários
            </Typography>
            <CardContent className={styles.cardMedia}>
              <div>
              <form className={styles.form} onSubmit={handleFormLogin}>
                <TextField
                  id="outlined-disabled"
                  label="Informe seu usuário"
                  className={styles.loginFormField}
                  value={formData['user']}
                  required onChange={(e) => {handleFormLoginEdit(e, 'user')}}
                />
                <TextField
                  id="outlined-password-input"
                  label="Informe seu senha"
                  type="password"
                  className={styles.loginFormField}
                  value={formData['password']}
                  required onChange={(e) => {handleFormLoginEdit(e, 'password')}}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={styles.button}
                  onClick={handleFormLogin}
                >
                  Acessar
                </Button>
                {error && <p className={styles.p}>{error}</p>}
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
    