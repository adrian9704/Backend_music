describe("[APP] Esta es la prueba general", () => {
    test("Esto deberia retornar", () =>{
        const a=4;
        const b=4;
        const total = a+b;
        expect(total).toEqual(8)
    })
})