## History
For several decades MVC was considered as an approach to separate business logic from data sources and views. Views were mostly html pages.
```
         +------------+
         | CONTROLLER |      +
         +------------+      |
            |       |        |
+-------+   |       |     +---------+
| MODEL +---+       +-----+  | VIEW |
+-------+                 +---------+
                             |
                             |
                     SERVER  +  CLIENT
```

## Deeper history
Originally MVC was invented (adopted) in smalltalk community to do desktop UI (proof https://martinfowler.com/eaaDev/uiArchs.html#ModelViewController). They even had an idea of higher-order components and dumb components (having only view and model)

## Modern JavaScript
Currently Web Components are very close to an original idea of MVC (good starting point https://youtu.be/plt-iH_47GE)
The same video leads us to an awesome effort showing how custom elements are supported 
https://custom-elements-everywhere.com/

## Example description
An example in `src` section shows how you can cook original MVC without any framework (you may not need "newer" MVC on the frontend).

Every dev pattern in the world is about S in SOLID. It is ridiculous to think that separating all your app into 3 pieces: Model, View and Controller is enough. You need to separate an app into smart (container) and dumb (presentational) MVC blocks. Second one should be raw View-Controller (model comes from outside), while the smart one may be the full MVC building block.