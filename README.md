# Pluralsight's Unit Testing in Angular Course
This course is up to date.

To get started, clone the repo or download it

npm install
npm test



# Things to consider when writing a test

Should you A) duplicate code within a test which makes it more readable. Or B) remove any duplication to improve maintainability of tests.

## DAMP vs DRY

>> DAMP (Descriptive And Meaningful Phrases) promotes the readability of the code.
To maintain code, you first need to understand the code. To understand it, you have to read it. Consider for a moment how much time you spend reading code. It's a lot. DAMP increases maintainability by reducing the time necessary to read and understand the code.

>> DRY (Don't repeat yourself) promotes the orthogonality of the code.
Removing duplication ensures that every concept in the system has a single authoritative representation in the code. A change to a single business concept results in a single change to the code. DRY increases maintainability by isolating change (risk) to only those parts of the system that must change.