const updateDados = (email, morada, telemovel, profissao, numero_utente) => {
    const pedido = Pedidos.updateMany({ numero_utente: numero_utente }, { email: email, morada: morada, telemovel: telemovel, profissao: profissao }, (err) => {
        if (err) {
            return res.status(400).send(err);
        } else {
            return res.send("Atualizado com sucesso!");
        }
    });
}