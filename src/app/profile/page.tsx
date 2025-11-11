const categorias = [
        'Brinquedos', 'Cozinha', 'Acessórios', 'Beleza',
        'Eletrônicos', 'Moda', 'Esporte & Fitness',
        'Papelaria & Escritório', 'Pet Shop', 'Automotivo',
        'Móveis', 'Jardim & Varanda',
    ]
const Profile = () => {

    for (const [idx, value] of categorias.entries()) {


        console.log(idx, value)

    }
    return (

        <h1>Profile</h1>

    )

}

export default Profile