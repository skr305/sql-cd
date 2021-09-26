import NotInitedError from "@/lib/errors/not-inited";

const mysql = require('mysql');

class Connection {
    connection:any = "";

    init = () => {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            database: 'hotel_book',
        });
        
        
        this.connection.connect(function(err:Error) {
            if (err) {
              return console.error('error: ' + err.message);
            }
          
            console.log('Connected to the MySQL server.');
        });
    
        return this;
    };


    getConnection = () => {
        // the server hadn't inited the connection
        if(!this.connection) {
            throw NotInitedError;
        }

        return this.connection
    };
}


export default new Connection();