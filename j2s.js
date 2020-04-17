class J2S {
  
  constructor() {
    this.lines = [];
  }

  transform(obj) {
    this.lines = [];
    
    this.walk(4, obj);

    console.log("/**");
    console.log(" * @swagger");
    console.log(" * definitions:");
    console.log(" *   Response:");

    this.lines.map((line) => {
      console.log(" *" + line);
    })

    console.log(" */");
  }

  walk(ident, obj) {
    const spaces = " ".repeat(ident);
    this.lines.push(`${spaces}type: object`);
    this.lines.push(`${spaces}properties:`);
    for (var prop in obj) {
      const type = Array.isArray(obj[prop])? "array":typeof obj[prop];
      switch(type) {
        case "string":
        case "boolean":
        case "number":
          this.lines.push(`${spaces}  ${prop}:`);
          this.lines.push(`${spaces}    type: ${type}`);
          break;
        case "array":
          this.lines.push(`${spaces}  ${prop}:`);
          this.lines.push(`${spaces}    type: ${type}`);
          this.lines.push(`${spaces}    items:`);
          this.walk(ident + 6, obj[prop].shift());
          break;
        case "object":
          this.lines.push(`${spaces}  ${prop}:`);
          this.walk(ident + 4, obj[prop]);
          break;
        }
    }
    
    this.lines.push(`${spaces}required:`);
    for (var prop in obj) {
      const type = Array.isArray(obj[prop])? "array":typeof obj[prop];
      switch(type) {
        case "string":
        case "number":
          this.lines.push(`${spaces}  - ${prop}`);
          break;
      }
    }
  }
}

var myArgs = process.argv.slice(2);
console.log('Loading payload: ', myArgs[0]);

var exec = require('child_process').exec;

exec(myArgs[0], function (error, stdout, stderr) {
  console.log('Gererating swagger definition...');

  console.log('\n\n');

  new J2S().transform(JSON.parse(stdout));
});
