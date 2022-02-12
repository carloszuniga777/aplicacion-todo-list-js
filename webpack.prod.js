/* Archivo de configuracion del webpack produccion: Sirve para cargar el archivo a produccion u clientes con x navegador
 
   Se tiene que ejecutar el comando: npm run build
   El cual ejecuta el build de package.json y genera una carpeta llamada 'dist' con los archivos
   index.hmt, js y ccs

   Para ejecutar la app en el servidor se usa el comando: npm start

   cuando la ventana de comando se queda pegada ejecutar ctrl + c y luego salir
*/



const HtmlWebPackPlugin     = require('html-webpack-plugin');
const MiniCssExtractPlugin  = require("mini-css-extract-plugin").default; 
const CopyPlugin            = require("copy-webpack-plugin");
const CssMinimizerPlugin    = require("css-minimizer-webpack-plugin");
const Terser                = require("terser-webpack-plugin"); 


module.exports = {
 
    mode: 'production', 

    output: {
        clean: true,
        filename: 'main.[contenthash].js'
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
                        test: /\.(png|svg|jpg|gif)$/,
                        loader: 'file-loader'   
                        /*
                        use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    esModule: false,
                                    name: 'assets/[name].[ext]'
                                }
                            }
                        ] */
                    },

                    {
                        test: /\.m?js$/,
                        exclude: /node_modules/,
                        use: {
                          loader: "babel-loader",
                          options: {
                            presets: ['@babel/preset-env']
                          }
                        }
                      }  
               ],
            },

    optimization: {
        minimize: true,
        minimizer: [
                   new CssMinimizerPlugin(),
                   new Terser()
        ],
    }, 


    plugins: [
        new HtmlWebPackPlugin({
            title: 'Mi WebpackApp',
            filename: './index.html',
            template: './src/index.html'
        }),

    
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css',
           // filename: '[name].[contentHash].css',
            ignoreOrder: false
        }),
        
        
        new CopyPlugin({
            patterns: [ { from: 'src/asset/', to: 'asset/' }]
        })
    ]   
}

