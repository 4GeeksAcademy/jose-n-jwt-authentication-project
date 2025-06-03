const getState = ({ getStore, getActions, setStore }) => {

	const apiUrl = process.env.BACKEND_URL;

	return {
		store: {

			users : [],

			private : ""
	
		},
		actions: {
			// Use getActions to call a function within a fuction

						exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			
			signUp: async (email,password)=>{
				try {

					const urlSignup = "https://symmetrical-parakeet-g47grj45xpw7cp945-3001.app.github.dev//api/signup";
					const result = await fetch(urlSignup,{

						method: "POST",
						body: JSON.stringify({ 'email': email, 'password': password }),
						headers: {
							"Content-type": "application/json; charset=UTF-8"
						}
					})	
					if(!result.ok){
							throw new Error(result.status);

					}

					const data = await result.json()
					console.log(data)

					console.log("Se ha registrado el usuario", data)
					return true;
					
				} catch (error) {
					console.error("Este es el error: ", error)
					return false;
					
				}
			},

			login: async (email,password) => {
				try {

					const URLlogin = `${apiUrl}/api/login`;
					const result = await fetch(URLlogin,{

						method: "POST",
						body: JSON.stringify({ 'email': email, 'password': password }),
						headers: {
							"Content-type": "application/json; charset=UTF-8"
						}
					})

					const data = await result.json()


					if(!data.token){
						console.error(data, "No se recibio token")
					}

					localStorage.setItem("token",data.token)
					console.log("Usuario logueado exitosamente")
					return true;
				} catch (error) {
					console.error("Este es el error: ", error)
					return false;
					
				}
			},

			private: async() =>{
				try {
					const urlPrivate = `${apiUrl}/api/private`;

					const result = await fetch(urlPrivate,{

						method: "GET",
						headers: {
							'Authorization': `Bearer ${localStorage.getItem('token')}`,
							"Content-type": "application/json; charset=UTF-8"
						}
					})

					if(!result.ok){
						throw new Error("Se tuvo el siguiente error: ", result.status)
					}

					const data = await result.json()

					setStore({...getStore(), private: data.msg})
					console.log(getStore().private)

					return true;
					
				} catch (error) {

					console.error("Este es el error: ", error)
					return false;
					
				}
			}
		}
	};
};

export default getState;
