Archived repository - app routes was **much** slower than page routing. Unsure why. Almost identical code.

Speedss dropped from ~800Mbps to ~500Mbps.

Edit: Turns out it was using origin to run the functions, despite them being no different to the pages functions (beyond syntax changes). Used up 5GB of Fast Origin Transfer due to this and results are slower as they have to route all the way back to the origin you set - not the closest edge server.
