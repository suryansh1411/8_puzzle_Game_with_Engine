/*
    This code should compiled and executed in LINUX g++ environment.
	
	In terminal,
	For compiling use: g++ -o bfs bfs.cpp 
	For executing use: ./bfs
*/


#include<bits/stdc++.h>
using namespace std;

int dirx[4]={-1, 0, 1, 0};
int diry[4]={0, -1, 0, 1};
char dir[4]={'U','L','D','R'};


bool convert_line_to_state(string &line, vector<vector<char>> &state)
{
    int ind=0;

    vector<char> items;     //stores

    //extract words 
	while(ind<line.length())
	{
		if(line[ind]==' ' || line[ind]=='\n' || line[ind]=='\t')      //whitespaces
		{
			//do nothing
		}
		else
		{
			items.push_back(line[ind]);                     
	    }
		
		ind++;
	}

    ind=0;
    if(items.size()!=9)
    {
        return false;
    }
    
    for(int i=0;i<3;i++)
    {
        for(int j=0;j<3;j++)
        {
            state[i][j]=items[ind];
            ind++;
        }
    }

    return true;
}


int inversions(vector<vector<char>> &state)
{
    vector<int> v;

    for(int i=0;i<3;i++)
    {
        for(int j=0;j<3;j++)
        {
            if(state[i][j]!='*')
            {
                v.push_back(state[i][j]-'0');
            }
        }
    }

    int invs=0;

    for(int i=0;i<8;i++)
    {
        int inv=v[i]-1;

        for(int j=0;j<i;j++)
        {
            if(v[j]<v[i]) inv--;
        }

        invs+=inv;
    }

    return invs;
}


bool isSolvable(vector<vector<char>> &start_state, vector<vector<char>> &goal_state)
{
    int inv1=inversions(start_state);
    int inv2=inversions(goal_state);

    if((inv2-inv1)%2) return false;
    return true;
}


void print_state(vector<vector<char>> &state)
{
    for(int i=0;i<3;i++)
    {
        for(int j=0;j<3;j++)
        {
            cout<<state[i][j]<<' ';
        }
        cout<<endl;
    }
}


int heuristic_func(vector<vector<char>>& state)
{
    return 0;
}


bool set_push(unordered_set<string> &s, vector<vector<char>>& state)
{
    string str="";
    for(int i=0;i<state.size();i++)
    {
        for(int j=0;j<state[i].size();j++)
        {
            str.push_back(state[i][j]);
        }
    }

    if(s.find(str)!=s.end()) return true;

    s.insert(str);
    return false;
}


bool isGoal(vector<vector<char>>& state, int &x, int &y, vector<vector<char>> & goal_state)
{
    bool flag=true;

    for(int i=0;i<state.size();i++)
    {
        for(int j=0;j<state[i].size();j++)
        {
            if(state[i][j]!=goal_state[i][j])
            {
                flag=false;
            }
            if(state[i][j]=='*')
            {
                x=i;
                y=j;
            }
        }
    }

    return flag;
}


bool inRange(int a, int b, int n, int m)
{
    if(a<0 || b<0 || a>=n || b>=m) return false;
    return true;
}


void solve(vector<vector<char>> start_state, vector<vector<char>> goal_state)
{   
    double Etime;
    clock_t t;
    t=clock();

    unordered_set<string> s;
    int nodes_explored=0;

    priority_queue< pair<int, pair<int, pair<vector<vector<char>>, string>>> , vector<pair<int, pair<int, pair<vector<vector<char>>, string>>> > ,greater< pair<int, pair<int, pair<vector<vector<char>>, string>>>  > > pq;
    pq.push({heuristic_func(start_state)+0, {0, {start_state, ""}}});

    while(pq.empty()==false)
    {
        pair<int, pair<int, pair<vector<vector<char>>, string>>> temp=pq.top();
        pq.pop();

        if(set_push(s, temp.second.second.first)) continue;

        nodes_explored++;

        int x, y;
        string dirc;

        if(isGoal(temp.second.second.first, x, y, goal_state))
        {
            t=clock()-t;
            Etime=((double)t)/CLOCKS_PER_SEC;
            cout<<"Solution : "<<temp.second.second.second<<endl;
            cout<<"Number of steps : "<<temp.second.second.second.length()<<endl;
            cout<<"Nodes explored : "<<nodes_explored<<endl;
            cout<<"Time taken to solve this testcase : "<<fixed<<Etime<<"s"<<endl;
            return;
        }

        for(int d=0;d<4;d++)
        {
            int a=x+dirx[d];
            int b=y+diry[d];

            if(inRange(a, b, 3, 3))
            {
                swap(temp.second.second.first[x][y], temp.second.second.first[a][b]);
                dirc=temp.second.second.second + dir[d];
                pq.push({heuristic_func(temp.second.second.first)+temp.second.first+1, {temp.second.first+1, {temp.second.second.first, dirc}}});
                
                swap(temp.second.second.first[x][y], temp.second.second.first[a][b]);

            }
        }
    }
}

int main()
{
    double Etime;
    clock_t t;
    t=clock();

    ifstream fin;

    fin.open("input.txt");

    int testcase=0;

    while(fin.peek()!=EOF)
    {
        string start_state_line;
        getline(fin, start_state_line);

        if(fin.peek()==EOF) break; 

        string goal_state_line;
        getline(fin, goal_state_line);

        vector<vector<char>> start_state(3, vector<char> (3));
        vector<vector<char>> goal_state(3, vector<char> (3));

        convert_line_to_state(start_state_line, start_state);
        convert_line_to_state(goal_state_line, goal_state);

        testcase++;

        cout<<"-------------TestCase-"<<testcase<<"-------------"<<endl;

       if(isSolvable(start_state, goal_state)) solve(start_state, goal_state);
        else 
        {
            cout<<"not solvable"<<endl;
            cout<<endl;
            continue;
        }

        cout<<endl;

        if(fin.peek()==EOF) break;

        string waste_line;
        getline(fin, waste_line);

    }

    fin.close();

    t=clock()-t;
    Etime=((double)t)/CLOCKS_PER_SEC;

    cout<<"-------------Overall"<<"-------------"<<endl;
    cout<<"Total time taken to solve all the testcases : "<<fixed<<Etime<<"s"<<endl;

    return 0;
}