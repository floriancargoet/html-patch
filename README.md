html-patch
==========
**Work in progress**

Patches HTML files with DOM-oriented rules.

Simple example
--------------
Input file:
```
<html>
  <head>
    <title>Simple rules</title>
  </head>
  <body>
    <p class="remove-me">Remove me</p>
    <p class="give-me-children">
      <span>First</span>
    </p>
  </body>
</html>
```

Rules:
```
<rules>
  <remove selector="p.remove-me" />
  <append selector="p.give-me-children">
    <span>Second</span>
    <span>Third</span>
  </append>
</rules>
```

Output:
```
<html>
  <head>
    <title>Simple rules</title>
  </head>
  <body>

    <p class="give-me-children">
      <span>First</span>

    <span>Second</span>
    <span>Third</span>
  </p>
  </body>
</html>
```

Known issues
------------
- not enough commands
- rules must be valid XML (cannot contain `<br>` but `<br/>` is fine)
- formatting
