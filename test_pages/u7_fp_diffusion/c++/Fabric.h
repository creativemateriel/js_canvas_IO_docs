#ifndef _FABRIC_H
#define _FABRIC_H

//=====================================================================
//
//	Communication by diffusion.
//
//	Concept and implementation by Simon Fernandez Jun 2002
//
//=====================================================================

#include "StandardTypes.h"
#include "Genome.h"

#define P_500		500
#define P_1K		1000
#define P_10K		10000
#define P_100K		100000
#define P_500K		500000
#define P_1M		1000000
#define P_10M		10000000
#define P_100M		100000000
#define P_5M		5000000
#define P_50M		50000000
#define P_500M		500000000

enum FabricDimension
{
   HEXAGONAL_FABRIC = 6,
   SQUARE_FABRIC    = 4,
   LIST_FABRIC      = 9999
};

enum MsgType
{
	PRESSURE,
	SONIC_HEDGEHOG,
	ACTIVATOR_SENSE,
	ACTIVATOR_ANTISENSE,

	MESSAGE_ARRAY_SIZE,
	NULL_MESSAGE
};

enum HexWalls
{
	ME,
	L,		// left
	TL,		// top left
	TR,		// top right
	R,		// right
	BR,		// bottom right
	BL		// bottom left
};

enum SqrWalls
{
	SME,
	SL,		// left
	ST,		// top
	SR,		// right
	SB		// bottom
};


struct Message
{ 
	long    units;
	MsgType msg;
};

#define CELLSIZE_X         (4)
#define CELLSIZE_Y         (4)
#define FABRIC_PIX_X       (800)
#define FABRIC_PIX_Y       (600)
#define FABRIC_WIDTH       (FABRIC_PIX_X / CELLSIZE_X)
#define FABRIC_HEIGHT      (FABRIC_PIX_Y / CELLSIZE_Y)
#define MAX_FABRIC_WALLS   (10)

class FABRIC
{
public:
	FABRIC*  walls[MAX_FABRIC_WALLS];
	Message	msgs[MESSAGE_ARRAY_SIZE];
	Message	inMsgs[MESSAGE_ARRAY_SIZE];

   GENOME gFab;

	FABRIC();
	void Diffuse();
	void Regroup();
	bool InsertMessage(MsgType msg, long units);
   void Insert1MsgPressure(void);

};

void InitFabric(Uint16 xLower, Uint16 yLower, Uint16 xHigher, Uint16 yHigher);

extern FABRIC (*env)[FABRIC_HEIGHT];
extern FabricDimension selectedDimension;
extern Uint8 FABRIC_WALLS;
#endif