const {app, BrowserWindow} = require('electron')
const {ipcMain} = require('electron');
const fs = require('fs');


let mainWindow
app.on('ready', () => {

    mainWindow = new BrowserWindow({
        width:1920,
        heigth:1080,
        minWidth:1280,
        minHeight:720,
        webPreferences:{
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            nodeIntegrationInSubFrames: true,
            enableRemoteModule: true,
            contextIsolation:false
        }


    })

    mainWindow.loadURL(`file://${__dirname}/src/pages/home/index.html`)



})
app.on('window-all-closed', () =>{
    if(process.platform !== 'darwin'){
        app.quit()
    }
})

ipcMain.on('salvar_lista_de_tarefas', function(event, dados){
    const lista_de_tarefas = dados

    //armazenamento local
    fs.writeFileSync('lista.txt', lista_de_tarefas)
    console.log('Salvamento completo!')


})

ipcMain.on('chamada_de_cards', function(event, dados){
    if (dados == "chamada_de_cards"){

        var cards = fs.readFileSync('lista.txt')
        console.log (`Retorno dos cards ${cards.toString()}`)
        event.reply('chamada_de_dados_res', cards.toString())
        
    }
    if (dados == "chamada_de_cards_para_salvamento"){
        var cards = fs.readFileSync('lista.txt')
        console.log (`Retorno dos cards para salvamento ${cards.toString()}`)
        event.reply('chamada_de_cards_para_salvamento_res', cards.toString())
        console.log(cards)
    }

})

