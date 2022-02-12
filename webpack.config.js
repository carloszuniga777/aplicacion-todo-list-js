/* Archivo de configuracion del webpack developer 
 
   Se tiene que ejecutar el comando: npm run build
   El cual ejecuta el build de package.json y genera una carpeta llamada 'dist' con los archivos
   index.hmt, js y ccs

   Para ejecutar la app en el servidor se usa el comando: npm start

   cuando la ventana de comando se queda pegada ejecutar ctrl + c y luego salir
*/



const HtmlWebPackPlugin     = require('html-webpack-plugin');
const MiniCssExtractPlugin  = require("mini-css-extract-plugin").default; 
const CopyPlugin            = require("copy-webpack-plugin");
 
module.exports = {
 
    mode: 'development',

    output: {
        clean: true
    },

    module: {
        rules: [

                    {
                        test: /\.html$/i,        //Busca todos los archivos html
                        loader: 'html-loader',   //paquete que se instalo
                        options: {
                            sources: false,
                        },
                    },

                    {
                        test: /\.css$/,                     
                        exclude: /styles.css$/,     
                        use: [ { loader: 'style-loader' }, { loader: 'css-loader' } ]
                    },
                   {
                        test: /styles.css$/,        //Importa el archivo style.css a la carpeta dist y enlaza automaticamente el estilo en el index.html | Se debe importar el estilo style.css en index.js
                        use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader']

                    },
                    {
                        test: /\.(png|jpe?g|gif)$/,
                        loader: 'file-loader'
                    }  
               ],
            },

    optimization: {},


    plugins: [
        new HtmlWebPackPlugin({
            title: 'Mi WebpackApp',
            filename: 'index.html',
            template: './src/index.html'
        }),
        
      
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),
        
        new CopyPlugin({
            patterns: [ { from: 'src/asset/', to: 'asset/' }]
        })
    ]   
}

