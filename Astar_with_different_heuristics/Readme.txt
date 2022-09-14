These codes should compiled and executed in LINUX g++ environment.
	

1) In "bfs.cpp", I have applied heuristic function h=0, i.e., bfs.

In terminal,
For compiling use: g++ -o bfs bfs.cpp 
For executing use: ./bfs


2) In "hamming.cpp", I have applied heuristic function h=hamming distance , i.e., number of misplaced tiles

In terminal,
For compiling use: g++ -o hamming hamming.cpp 
For executing use: ./hamming


3) In "manhattan.cpp", I have applied heuristic function h=manhattan distance, i.e., sum of horizontal and vertical distance of each tile from its desired position.
 
 In terminal,	
For compiling use: g++ -o manhattan manhattan.cpp 
For executing use: ./manhattan


-------------------------------------------------------------------------------------

INPUT

Input is present in "input.txt". 
There are 10 test cases, each pair of lines represent one test case.
The same test cases are used to run on different heuristic functions.


-------------------------------------------------------------------------------------

OUTPUT

Output is generated in the terminal itself.

For each testcase, 
    Solution is given, i.e, which rule to apply is given (L-left, R-right, U-Up, D-Down)
    Number of steps is given, i.e, length of solution.
    Nodes explored is given, i.e, number of nodes removed from the fringe.
    Time taken to solve this testcase is given.

eg:-
-------------TestCase-1-------------
solution : LURDDLURRULLDRRDLLURRULDLU
Number of steps : 26
nodes explored : 162241
time taken to solve this testcase : 5.064126s
