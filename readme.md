# J2S - Json to Swagger

### Desription

J2S is a script to transform any payload from a curl and
generate a swagger definittion comment.

### How to use

```bash
node j2s.js 'curl http://dummy.restapiexample.com/api/v1/employees'
```

### To Do ###

- Load from a file
- Export to YAML

### Bugs ###

- Root element must be a object (cannot be an array)
- Empts required entries ( remove it manually )
