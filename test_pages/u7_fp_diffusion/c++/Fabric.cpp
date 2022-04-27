//=====================================================================
//
//	Communication by diffusion.
//
//	Concept and implementation by Simon Fernandez Jun 2002
//  Copyright Simon Fernandez 2002
//
//=====================================================================

#include <stdafx.h>
#include "Fabric.h"
#include "StandardTypes.h"

/* Use this to select dimension - may better to replace with conditional compile make code smaller
   switch(selectedDimension)
   {
   case HEXAGONAL_FABRIC: // Original
      break;
   case SQUARE_FABRIC:   	
      break;
   case LIST_FABRIC:
      break;
   default:
      break;
   }
*/
//FabricDimension selectedDimension = HEXAGONAL_FABRIC;
FabricDimension selectedDimension = SQUARE_FABRIC;
Uint8 FABRIC_WALLS;
#define DIFFUSE_IN
FABRIC (*env)[FABRIC_HEIGHT];

/************************************************************************
*  FUNC:
*
*  DESC:
*
*
*
************************************************************************/
FABRIC::FABRIC()
{
	for (int n=0; n<MAX_FABRIC_WALLS; n++) walls[n] = 0;
	
	for (int m=0; m<MESSAGE_ARRAY_SIZE; m++) // initialise Message array : Current Outgoing
	{
		msgs[m].units = 0;
		msgs[m].msg   = NULL_MESSAGE;
	}

	for (m=0; m<MESSAGE_ARRAY_SIZE; m++) // initialise Message array : Cumulative Incoming
	{
		inMsgs[m].units = 0;
		inMsgs[m].msg   = NULL_MESSAGE;
	}
}

/************************************************************************
*  FUNC: Diffuse
*
*  DESC: Send an equal amount of message from this cell into existing 
*        surrounding cells. 
*
*  NOTE: if DIFFUSE_IN is defined this diffuses to this cell also
*        works for selectedDimension = HEX or SQUARE
************************************************************************/
void FABRIC::Diffuse()
{
	Uint8    ifaces = 0;
	Uint32   postUnits = 0;
	Uint32   spare = 0;
   Uint16   forEachMsgType = 0;
   Uint8    forEachCellWall = 0;

   //switch(selectedDimension)
   FABRIC_WALLS = selectedDimension+1; // hexagonal + pointer this cell
   // cycleMsgs is used as the index for the msgs structure array
   for(forEachMsgType = 0; forEachMsgType < MESSAGE_ARRAY_SIZE; forEachMsgType++){

      // diffuse particles into surrounding cell for each type of message
      if (this->msgs[forEachMsgType].units > 0){
         // count how many cell wall - this information should be kept up to date by the
         // divide process as the organism grows - avoids having to do the calc here
         for (int n=1; n<FABRIC_WALLS; n++) 
            if(this->walls[n] != 0) ifaces++;

         #ifdef DIFFUSE_IN
         ifaces++; // add one for walls[0] ie ME
         #endif 

         // divide up units equally
         postUnits = this->msgs[forEachMsgType].units / ifaces;
         // gather leftover particles so they don't get lost
         spare = this->msgs[forEachMsgType].units % ifaces;

         // post units to existing cell walls
         for (forEachCellWall = 1; forEachCellWall < FABRIC_WALLS; forEachCellWall++)
         {
            // look for existence of pointer before assinging particles
            if(this->walls[forEachCellWall] != 0) 
               // add check to see if surrounding cell will accept message.
               // this should be implemented/evaluated at moment of divide/mask change
               // add particles to the incoming message array of surrounding cells
               this->walls[forEachCellWall]->inMsgs[forEachMsgType].units = this->walls[forEachCellWall]->inMsgs[forEachMsgType].units + postUnits;
               // transfer msgs identifier
         }

         // add an equal amount of particles to this cell
         // don't need to transfer message identifier since this cell is the progenitor
         // and is the source of the identifier
         #ifdef DIFFUSE_IN
         this->inMsgs[forEachMsgType].units += (postUnits + spare);
         #else 
         this->inMsgs[forEachMsgType].units += (spare);
         #endif 

         // NOTE:
         // units may or maynot be posted according to their attribute an the filter 
         // on the cell wall i/f
         ifaces = 0;
      }
   }
}

/************************************************************************
*  FUNC: Regroup
*
*  DESC: Take msgs diffused in from surrounding cells and move to current
*        msg array.
*
*  NOTE: works for selectedDimension = HEX or SQUARE
*        #def or #ndef DIFFUSE_IN
************************************************************************/
void FABRIC::Regroup()
{
   Uint16 forEachMsgType = 0;
	
   for (forEachMsgType = 0; forEachMsgType < MESSAGE_ARRAY_SIZE; forEachMsgType++) {
      this->msgs[forEachMsgType].units = this->inMsgs[forEachMsgType].units;
      this->inMsgs[forEachMsgType].units = 0;
	}
}


/************************************************************************
*  FUNC:
*
*  DESC:
*
*
*
************************************************************************/
bool FABRIC::InsertMessage(MsgType msg, long units)
{
	this->msgs[msg].units += units;
	this->msgs[msg].msg = msg;

	return(false);
}

/************************************************************************
*  FUNC:
*
*  DESC:
*
*
*
************************************************************************/
void FABRIC::Insert1MsgPressure(void)
{
	this->msgs[0].units += 20000;
}

//void InitFabric(FABRIC (*fab)[150],int xLower, int yLower, int xHigher, int yHigher);

//void InitFabric(FABRIC (*fab),int xLower, int yLower, int xHigher, int yHigher)
//{
//   TRACE("Fabric Limits: %l %d %d %d %d",env,xLower,yLower,xHigher,yHigher);
//}
/************************************************************************
*  FUNC:
*
*  DESC:
*
*
*
************************************************************************/
void InitFabric(Uint16 xLower, Uint16 yLower, Uint16 xHigher, Uint16 yHigher)
{
   #ifdef DIFFUSE_IN
      TRACE("\nDIFFUSE IN\n");
   #else
      TRACE("\nDIFFUSE OUT\n");
   #endif 

   switch(selectedDimension)
   {
   case HEXAGONAL_FABRIC: // Original
                                                   //    Cell Wall Reference
   	// int x,y;												//   
   	// assign each cell it a pointer to itself.		 //      TL    TR   
   	for (int y=yLower; y<yHigher; y++)               //       2    3
   	{												
   		for (int x=xLower; x<xHigher; x++)   	    //       L    ME    R
         {										             //       1    0     4
   			env[x][y].walls[ME] = &env[x][y];		
   		}											//			             6    5
   	}												//		               BL    BR
   
      // assign cell 1 & 4 pointers (cells to L & R on the same line)
   	for (y=yLower; y<yHigher; y++)						
   	{
   		env[xLower][y].walls[L] = 0;	// first in the row
   		env[xLower][y].walls[R] = &env[xLower+1][y];
   		for (int x=xLower+1; x<xHigher-1; x++)
   		{
   			env[x][y].walls[L] = &env[x-1][y];	// put pointer to cell to the left in walls[L]
   			env[x][y].walls[R] = &env[x+1][y];
   		}
   		env[xHigher-1][y].walls[L] = &env[xHigher-2][y];	
   		env[xHigher-1][y].walls[R] = 0;
   	}
   
   	
   	// assign TL TR cell walls
   	// row y=0 easy clear all TL an TR pointers
   	// row y=1 offset = 1 so first cell has TL & TR walls - last cell only TL
   	// row y=2 offset = 0 so first cell only has TR wall  - last both TL & TR
   	// row y=3 offset = 1 so first cell has TL & TR walls etc etc
   	for (int x=xLower; x<xHigher; x++) { // row y=0
   		env[x][yLower].walls[TL] = 0; 
   		env[x][yLower].walls[TR] = 0;
   	}
   	for (y=yLower+1; y<yHigher; y++)						
   	{												
   		int offset = 1 * (y % 2);
   		// do cell at start of row
   		if (offset){  // do LEFT edge of cell fabric
   			env[xLower][y].walls[TL] = &env[xLower][y-1];
   			env[xLower][y].walls[TR] = &env[xLower+1][y-1];
   		}
   		else {
   			// causing unhandled access violation x=199,y=38
   			env[xLower][y].walls[TL] = 0;
   			env[xLower][y].walls[TR] = &env[xLower][y-1];
   		}
   		// do rest of cells except for last one
   		for (int x=xLower+1; x<xHigher-1; x++)					
   		{
   			if (offset) {
   				env[x][y].walls[TL] = &env[x][y-1];
   				env[x][y].walls[TR] = &env[x+1][y-1];
   			}
   			else {
   				env[x][y].walls[TL] = &env[x-1][y-1];
   				env[x][y].walls[TR] = &env[x][y-1];
   			}
   		}							
   		// do last cell in row
   		if (offset){  // do RIGHT edge of cell fabric (LAST FABRIC)
   			env[xHigher-1][y].walls[TL] = &env[x][y-1];
   			env[xHigher-1][y].walls[TR] = 0;
   		}
   		else {
   			env[xHigher-1][y].walls[TL] = &env[x-1][y-1];
   			env[xHigher-1][y].walls[TR] = &env[x][y-1];
   		}
   	}
   	
   	// assign BL BR cell walls
   	for (y=yLower; y<yHigher-1; y++)						
   	{												
   		int offset = 1 * (y % 2);
   		// do cell at start of row
   		if (offset){  // do LEFT edge of cell fabric
   			env[xLower][y].walls[BL] = &env[xLower][y+1];
   			env[xLower][y].walls[BR] = &env[xLower+1][y+1];
   		}
   		else {
   			env[xLower][y].walls[BL] = 0;
   			env[xLower][y].walls[BR] = &env[xLower][y+1];
   		}
   		// do rest of cells except for last one
   		for (int x=xLower+1; x<xHigher-1; x++)					
   		{
   			if (offset) {
   				env[x][y].walls[BL] = &env[x][y+1];
   				env[x][y].walls[BR] = &env[x+1][y+1];
   			}
   			else {
   				env[x][y].walls[BL] = &env[x-1][y+1];
   				env[x][y].walls[BR] = &env[x][y+1];
   			}
   		}							
   		// x still in scope and = 199
   		// do last cell in row
   		if (offset){  // do RIGHT edge of cell fabric (LAST FABRIC)
   			env[xHigher-1][y].walls[BL] = &env[x][y+1];
   			env[xHigher-1][y].walls[BR] = 0;
   		}
   		else {
   			env[xHigher-1][y].walls[BL] = &env[x-1][y+1];
   			env[xHigher-1][y].walls[BR] = &env[x][y+1];
   		}
   	}
   	// do bottom row
   	for (x=xLower; x<xHigher-1; x++) { // row y=149
   		env[x][yHigher-1].walls[BL] = 0; 
   		env[x][yHigher-1].walls[BR] = 0;
   	}
   
   	//TRACE( "\nAddress as:\t%p\n", env[0][0].walls[BR]);
      /*
         // THE FOLLOWING ALL DO THE SAME
         env[100][75].Insert1MsgPressure();
            
         FABRIC* pF; // object pointer 
         pF = &env[75][75];
         pF->Insert1MsgPressure();     // call function using object pointer
      
         gene.pHead->pGene = &FABRIC::Insert1MsgPressure; // assign function to node
      
         pF = &env[125][75];           // select ne object
         (pF->*gene.pHead->pGene)();   // run function on new object
      */      
      break;
   case SQUARE_FABRIC:
                                                   //    Cell Wall Reference
   	// int x,y;												//   
   	// assign each cell it a pointer to itself.		 //        ST
   	for (int y=yLower; y<yHigher; y++)               //         2
   	{												
   		for (int x=xLower; x<xHigher; x++)   	    //      SL   SME    SR
         {										             //       1    0     3
   			env[x][y].walls[SME] = &env[x][y];		
   		}											//			               4
   	}												//		                 SB
   
      // assign cell 1 & 3 pointers (cells to L & R on the same line)
   	for (y=yLower; y<yHigher; y++)						
   	{
   		env[xLower][y].walls[SL] = 0;	// first in the row
   		env[xLower][y].walls[SR] = &env[xLower+1][y];
   		for (int x=xLower+1; x<xHigher-1; x++)
   		{
   			env[x][y].walls[SL] = &env[x-1][y];	// put pointer to cell to the left in walls[L]
   			env[x][y].walls[SR] = &env[x+1][y];
   		}
   		env[xHigher-1][y].walls[SL] = &env[xHigher-2][y];	
   		env[xHigher-1][y].walls[SR] = 0;
   	}
   
      // assign cell 2 & 4 pointers (cells to T & B on the same line)
   	for (int x=xLower; x<xHigher; x++)
   	{
   		env[x][yLower].walls[ST] = 0;	// first in the column
   		env[x][yLower].walls[SB] = &env[x][yLower+1];
   		for (y=yLower+1; y<yHigher-1; y++)
   		{
   			env[x][y].walls[ST] = &env[x][y-1];	// put pointer to cell to the left in walls[L]
   			env[x][y].walls[SB] = &env[x][y+1];
   		}
   		env[x][yHigher-1].walls[ST] = &env[x][yHigher-2];	
   		env[x][yHigher-1].walls[SB] = 0;
   	}
   	
   case LIST_FABRIC:
      break;
   default:
      break;
   }
}

