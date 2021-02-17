// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"DeFF":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.URLParameters = void 0;

var URLParameters =
/** @class */
function () {
  function URLParameters(url) {
    var _this = this;

    this._params = [];
    var urlSearchParams = new URLSearchParams(url);
    urlSearchParams.forEach(function (param) {
      return _this._params.push(param);
    });
  }

  URLParameters.prototype.getFirstName = function () {
    return this._params[0];
  };

  URLParameters.prototype.getSecondName = function () {
    return this._params[1];
  };

  URLParameters.prototype.getTime = function () {
    return this._params[2];
  };

  return URLParameters;
}();

exports.URLParameters = URLParameters;
},{}],"Z1VZ":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamePage = void 0;

var GamePage =
/** @class */
function () {
  function GamePage(firstPlayerName, secondPlayerName) {
    this._firstPlayerName = firstPlayerName;
    this._secondPlayerName = secondPlayerName;
  }

  GamePage.prototype.displayGameInfo = function () {
    this.displayPlayersNames();
    this.addUndoButtonHandler();
  };

  GamePage.prototype.addOnClick = function (onClick) {
    this.onClick = onClick;
  };

  GamePage.prototype.displayPlayersNames = function () {
    var firstPlayer = document.getElementById('firstPlayerName');
    var secondPlayer = document.getElementById('secondPlayerName');
    firstPlayer.textContent = this._firstPlayerName;
    secondPlayer.textContent = this._secondPlayerName;
  };

  GamePage.prototype.addUndoButtonHandler = function () {
    var _this = this;

    var button = document.getElementById('button1');
    button.addEventListener('click', function () {
      return _this.onClick();
    });
  };

  return GamePage;
}();

exports.GamePage = GamePage;
},{}],"I7h2":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Move = void 0;

var Move =
/** @class */
function () {
  function Move(player, startSquare, destinationSquare) {
    this.castlingMove = false;
    this.enPassanteMove = false;
    this.player = player;
    this.startSquare = startSquare;
    this.destinationSquare = destinationSquare;
    this.movedPiece = startSquare.getPiece();
  }

  Move.prototype.getPlayer = function () {
    return this.player;
  };

  Move.prototype.getStartSquare = function () {
    return this.startSquare;
  };

  Move.prototype.getDestinationSquare = function () {
    return this.destinationSquare;
  };

  Move.prototype.getMovedPiece = function () {
    return this.movedPiece;
  };

  Move.prototype.getCapturedPiece = function () {
    return this.capturedPiece;
  };

  Move.prototype.setCapturedPiece = function (capturedPiece) {
    this.capturedPiece = capturedPiece;
  };

  Move.prototype.isEnPassanteMove = function () {
    return this.enPassanteMove;
  };

  Move.prototype.setEnPassanteMove = function (enPassante) {
    this.enPassanteMove = enPassante;
  };

  Move.prototype.isCastlingMove = function () {
    return this.castlingMove;
  };

  Move.prototype.setCastlingMove = function (castlingMove) {
    this.castlingMove = castlingMove;
  };

  Move.prototype.getFirstMove = function () {
    return this.firstMove;
  };

  Move.prototype.setFirstMove = function (firstMove) {
    this.firstMove = firstMove;
  };

  return Move;
}();

exports.Move = Move;
},{}],"PEJ1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = void 0;

var Move_1 = require("./Move");

var Player =
/** @class */
function () {
  function Player(name, time, isWhite) {
    this.name = name;
    this.timeRemaining = time;
    this.isWhite = isWhite;
  }

  Player.prototype.isWhiteSide = function () {
    return this.isWhite;
  };

  Player.prototype.playedMove = function (startSquare, destinationSquare, game) {
    var move = new Move_1.Move(this, startSquare, destinationSquare);
    return game.makeMove(move, this);
  };

  return Player;
}();

exports.Player = Player;
},{"./Move":"I7h2"}],"xcte":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Square = void 0;

var Square =
/** @class */
function () {
  function Square(row, column) {
    this.row = row;
    this.column = column;
    this.piece = null;
  }

  Square.prototype.getRow = function () {
    return this.row;
  };

  Square.prototype.getColumn = function () {
    return this.column;
  };

  Square.prototype.setPiece = function (piece) {
    this.piece = piece;
  };

  Square.prototype.getPiece = function () {
    return this.piece;
  };

  Square.prototype.setDomSquare = function (domSqare) {
    this.domSqare = domSqare;
  };

  Square.prototype.getDomSquare = function () {
    return this.domSqare;
  };

  return Square;
}();

exports.Square = Square;
},{}],"PfBc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PieceType = void 0;
var PieceType;

(function (PieceType) {
  PieceType["Pawn"] = "./pieces/Pawn.svg";
  PieceType["King"] = "./pieces/King.svg";
  PieceType["Queen"] = "./pieces/Queen.svg";
  PieceType["Rook"] = "./pieces/Rook.svg";
  PieceType["Bishop"] = "./pieces/Bishop.svg";
  PieceType["Knight"] = "./pieces/Knight.svg";
})(PieceType = exports.PieceType || (exports.PieceType = {}));
},{}],"bEfa":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawImage = void 0;

function drawImage(src, color) {
  var pieceImage = new Image();
  pieceImage.src = src;
  pieceImage.setAttribute('class', color);
  return pieceImage;
}

exports.drawImage = drawImage;
},{}],"IjT0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Piece = void 0;

var PieceType_1 = require("./PieceType");

var DrawPiece_1 = require("../../display/DrawPiece");

var Piece =
/** @class */
function () {
  function Piece(white) {
    this.killed = false;
    this.moved = false;
    this.white = false;
    this.white = white;
  }

  Piece.prototype.isWhite = function () {
    return this.white;
  };

  Piece.prototype.hasMoved = function () {
    return this.moved;
  };

  Piece.prototype.setMoved = function (moved) {
    this.moved = moved;
  };

  Piece.prototype.isKilled = function () {
    return this.killed;
  };

  Piece.prototype.kill = function (square) {
    this.killed = true;
    square.getDomSquare().innerHTML = null;
  };

  Piece.prototype.revive = function () {
    this.killed = false;
  };

  Piece.prototype.draw = function (removeFrom, addTo) {
    var pieceColour = this.isWhite() ? 'white' : 'black';
    var pieceType = this.constructor.name;
    addTo.getDomSquare().append(DrawPiece_1.drawImage(PieceType_1.PieceType[pieceType], pieceColour));
    if (removeFrom != null) removeFrom.getDomSquare().innerHTML = null;
  };

  return Piece;
}();

exports.Piece = Piece;
},{"./PieceType":"PfBc","../../display/DrawPiece":"bEfa"}],"oCyc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveDirection = void 0;
var MoveDirection;

(function (MoveDirection) {
  MoveDirection[MoveDirection["UP"] = 0] = "UP";
  MoveDirection[MoveDirection["Down"] = 1] = "Down";
})(MoveDirection = exports.MoveDirection || (exports.MoveDirection = {}));
},{}],"myQD":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pawn = void 0;

var Piece_1 = require("./Piece");

var MoveDirection_1 = require("../MoveDirection");

var Pawn =
/** @class */
function (_super) {
  __extends(Pawn, _super);

  function Pawn(white) {
    var _this = _super.call(this, white) || this;

    _this.promoted = false;
    _this.moveDirection = white ? MoveDirection_1.MoveDirection.UP : MoveDirection_1.MoveDirection.Down;
    return _this;
  }

  Pawn.prototype.isPromoted = function () {
    return this.promoted;
  };

  Pawn.prototype.setPromoted = function (promoted) {
    this.promoted = promoted;
  };

  Pawn.prototype.promoteTo = function (piece) {
    this.promotedTo = piece;
  };

  Pawn.prototype.isPromotedTo = function () {
    return this.promotedTo;
  };

  Pawn.prototype.getDirection = function () {
    return this.moveDirection;
  };

  Pawn.prototype.setDirection = function (newDirection) {
    this.moveDirection = newDirection;
  };

  Pawn.prototype.canMove = function (from, to, board) {
    var direction = this.getDirection();
    var verticalDistance = (direction == MoveDirection_1.MoveDirection.UP ? -1 : 1) * (from.getRow() - to.getRow());
    var horizontalDistance = Math.abs(from.getColumn() - to.getColumn()); // pawn can't jump over piece from initial position

    var sqaureInFront = board.getSquares()[direction == MoveDirection_1.MoveDirection.UP ? 2 : 5][from.getColumn()];

    if (to.getPiece() && to.getPiece().isWhite() == this.isWhite()) {
      return false;
    } //zwykły ruch
    //check if destination is empty


    if (to.getPiece() == null && horizontalDistance == 0) {
      //check if it's first move and there's nothing in front
      if (!this.hasMoved() && sqaureInFront.getPiece() == null) {
        return verticalDistance == 1 || verticalDistance == 2;
      } //this is not first move
      else {
          return verticalDistance == 1;
        }
    } //bicie


    if (this.canAttack(from, to, board) && to.getPiece() != null && to.getPiece().isWhite() != from.getPiece().isWhite()) {
      return true;
    }

    return this.isEnPassant(from, to, board);
  };

  Pawn.prototype.isEnPassant = function (from, to, board) {
    var direction = this.getDirection();
    var verticalDistance = (direction == MoveDirection_1.MoveDirection.UP ? -1 : 1) * (from.getRow() - to.getRow());
    var recentMove = board.getGame().getRecentMove(); // check if destination is valid

    if (to.getPiece() == null && verticalDistance == 1 && recentMove != null) {
      // check if moved piece was Pawn
      if (!(recentMove.getMovedPiece() instanceof Pawn)) {
        return false;
      } // check if horizontal distance between pieces was 1


      if (!(Math.abs(recentMove.getStartSquare().getColumn() - from.getColumn()) == 1)) {
        return false;
      } //check vertical distance between pawns


      var verticalDistanceBetweenPawns = recentMove.getDestinationSquare().getRow() - from.getRow();

      if (verticalDistanceBetweenPawns != 0) {
        return false;
      } // check if we want kill for good side (left/right)


      if (recentMove.getDestinationSquare().getColumn() != to.getColumn()) {
        return false;
      } // check if it was double square move


      if (!(Math.abs(recentMove.getStartSquare().getRow() - recentMove.getDestinationSquare().getRow()) == 2)) {
        return false;
      }

      return true;
    }
  };

  Pawn.prototype.canAttack = function (from, to, board) {
    var direction = this.getDirection();
    var verticalDistance = (direction == MoveDirection_1.MoveDirection.UP ? -1 : 1) * (from.getRow() - to.getRow());
    var horizontalDistance = Math.abs(from.getColumn() - to.getColumn());
    return verticalDistance == 1 && horizontalDistance == 1;
  };

  return Pawn;
}(Piece_1.Piece);

exports.Pawn = Pawn;
},{"./Piece":"IjT0","../MoveDirection":"oCyc"}],"jkoJ":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Knight = void 0;

var Piece_1 = require("./Piece");

var Knight =
/** @class */
function (_super) {
  __extends(Knight, _super);

  function Knight(white) {
    return _super.call(this, white) || this;
  }

  Knight.prototype.canMove = function (from, to, board) {
    var verticalDistance = Math.abs(from.getRow() - to.getRow());
    var horizontalDistance = Math.abs(from.getColumn() - to.getColumn());

    if (to.getPiece() && to.getPiece().isWhite() == this.isWhite()) {
      return false;
    }

    return verticalDistance * horizontalDistance == 2;
  };

  Knight.prototype.canAttack = function (from, to, board) {
    return this.canMove(from, to, board);
  };

  return Knight;
}(Piece_1.Piece);

exports.Knight = Knight;
},{"./Piece":"IjT0"}],"PPJx":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bishop = void 0;

var Piece_1 = require("./Piece");

var Bishop =
/** @class */
function (_super) {
  __extends(Bishop, _super);

  function Bishop(white) {
    return _super.call(this, white) || this;
  }

  Bishop.prototype.canMove = function (from, to, board) {
    var verticalDistanceDelta = Math.abs(to.getRow() - from.getRow());
    var horizontalDistanceDelta = Math.abs(to.getColumn() - from.getColumn());
    var verticalDistance = to.getRow() - from.getRow();
    var horizontalDistance = to.getColumn() - from.getColumn();
    var verticalDirection = verticalDistance == 0 ? 0 : verticalDistance / verticalDistanceDelta;
    var horizontalDirection = horizontalDistance == 0 ? 0 : horizontalDistance / horizontalDistanceDelta;
    var distance = verticalDistanceDelta > 0 ? verticalDistanceDelta : horizontalDistanceDelta;

    if (to.getPiece() && to.getPiece().isWhite() == this.isWhite()) {
      return false;
    }

    if (verticalDistanceDelta - horizontalDistanceDelta == 0) {
      for (var i = 1; i < distance; i++) {
        var checkedSquareV = from.getRow() + i * verticalDirection;
        var checkedSquareH = from.getColumn() + i * horizontalDirection;

        if (board.getSquares()[checkedSquareV][checkedSquareH].getPiece() != null) {
          return false;
        }
      }

      return true;
    }
  };

  Bishop.prototype.canAttack = function (from, to, board) {
    return this.canMove(from, to, board);
  };

  return Bishop;
}(Piece_1.Piece);

exports.Bishop = Bishop;
},{"./Piece":"IjT0"}],"G7S6":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rook = void 0;

var Piece_1 = require("./Piece");

var Rook =
/** @class */
function (_super) {
  __extends(Rook, _super);

  function Rook(white) {
    return _super.call(this, white) || this;
  }

  Rook.prototype.canMove = function (from, to, board) {
    var verticalDistanceDelta = Math.abs(to.getRow() - from.getRow());
    var horizontalDistanceDelta = Math.abs(to.getColumn() - from.getColumn());
    var verticalDistance = to.getRow() - from.getRow();
    var horizontalDistance = to.getColumn() - from.getColumn();
    var verticalDirection = verticalDistance == 0 ? 0 : verticalDistance / verticalDistanceDelta;
    var horizontalDirection = horizontalDistance == 0 ? 0 : horizontalDistance / horizontalDistanceDelta;
    var distance = verticalDistanceDelta > 0 ? verticalDistanceDelta : horizontalDistanceDelta;

    if (to.getPiece() && to.getPiece().isWhite() == this.isWhite()) {
      return false;
    }

    if (verticalDistanceDelta * horizontalDistanceDelta == 0) {
      for (var i = 1; i < distance; i++) {
        var checkedSquareV = from.getRow() + i * verticalDirection;
        var checkedSquareH = from.getColumn() + i * horizontalDirection;

        if (board.getSquares()[checkedSquareV][checkedSquareH].getPiece() != null) {
          return false;
        }
      }

      return true;
    }
  };

  Rook.prototype.canAttack = function (from, to, board) {
    return this.canMove(from, to, board);
  };

  return Rook;
}(Piece_1.Piece);

exports.Rook = Rook;
},{"./Piece":"IjT0"}],"mPVM":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Queen = void 0;

var Piece_1 = require("./Piece");

var Queen =
/** @class */
function (_super) {
  __extends(Queen, _super);

  function Queen(white) {
    return _super.call(this, white) || this;
  }

  Queen.prototype.canMove = function (from, to, board) {
    var verticalDistanceDelta = Math.abs(to.getRow() - from.getRow());
    var horizontalDistanceDelta = Math.abs(to.getColumn() - from.getColumn());
    var verticalDistance = to.getRow() - from.getRow();
    var horizontalDistance = to.getColumn() - from.getColumn();
    var verticalDirection = verticalDistance == 0 ? 0 : verticalDistance / verticalDistanceDelta;
    var horizontalDirection = horizontalDistance == 0 ? 0 : horizontalDistance / horizontalDistanceDelta;
    var distance = verticalDistanceDelta > 0 ? verticalDistanceDelta : horizontalDistanceDelta;

    if (to.getPiece() && to.getPiece().isWhite() == this.isWhite()) {
      return false;
    }

    if (verticalDistanceDelta * horizontalDistanceDelta == 0) {
      for (var i = 1; i < distance; i++) {
        var checkedSquareV = from.getRow() + i * verticalDirection;
        var checkedSquareH = from.getColumn() + i * horizontalDirection;

        if (board.getSquares()[checkedSquareV][checkedSquareH].getPiece() != null) {
          return false;
        }
      }

      return true;
    }

    if (verticalDistanceDelta - horizontalDistanceDelta == 0) {
      for (var i = 1; i < distance; i++) {
        var checkedSquareV = from.getRow() + i * verticalDirection;
        var checkedSquareH = from.getColumn() + i * horizontalDirection;

        if (board.getSquares()[checkedSquareV][checkedSquareH].getPiece() != null) {
          return false;
        }
      }

      return true;
    }
  };

  Queen.prototype.canAttack = function (from, to, board) {
    return this.canMove(from, to, board);
  };

  return Queen;
}(Piece_1.Piece);

exports.Queen = Queen;
},{"./Piece":"IjT0"}],"DykZ":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.King = void 0;

var Piece_1 = require("./Piece");

var King =
/** @class */
function (_super) {
  __extends(King, _super);

  function King(white) {
    var _this = _super.call(this, white) || this;

    _this.castlingDone = false;
    return _this;
  }

  King.prototype.isCastlingDone = function () {
    return this.castlingDone;
  };

  King.prototype.setCastlingDone = function (castlingDone) {
    this.castlingDone = castlingDone;
  };

  King.prototype.canMove = function (from, to, board) {
    var verticalDistanceDelta = Math.abs(to.getRow() - from.getRow());
    var horizontalDistanceDelta = Math.abs(to.getColumn() - from.getColumn()); //destination doesn't have any of my piece

    if (to.getPiece() && to.getPiece().isWhite() == this.isWhite()) {
      return false;
    }

    if (board.isDestinationUnderAttack(from, to, board)) {
      return false;
    }

    if (Math.max(verticalDistanceDelta, horizontalDistanceDelta) == 1) {
      return true;
    }

    if (this.isValidCastling(from, to, board)) {
      return true;
    }
  };

  King.prototype.isValidCastling = function (from, to, board) {
    if (this.hasMoved()) {
      return false;
    }

    if (this.isCastlingDone()) {
      return false;
    }

    var verticalDistanceDelta = Math.abs(to.getRow() - from.getRow());
    var horizontalDistanceDelta = Math.abs(to.getColumn() - from.getColumn());
    var horizontalDistance = to.getColumn() - from.getColumn(); //check if castling Rook has moved

    var castlingRook;
    var castlingRookHorizontalPosition;
    horizontalDistance < 0 ? castlingRookHorizontalPosition = 0 : castlingRookHorizontalPosition = 7;
    castlingRook = board.getSquares()[from.getRow()][castlingRookHorizontalPosition].getPiece();

    if (castlingRook == null) {
      return false;
    }

    if (castlingRook.hasMoved()) {
      return false;
    } //check if there's no piece in between


    var horizontalDirection = horizontalDistance / horizontalDistanceDelta;

    for (var i = 1; i < horizontalDistanceDelta; i++) {
      var checkedSquareH = from.getColumn() + i * horizontalDirection;

      if (board.getSquares()[from.getRow()][checkedSquareH].getPiece()) {
        return false;
      }
    } //is this correct square?


    if (verticalDistanceDelta == 0 && horizontalDistanceDelta == 2) {
      return true;
    }
  };

  King.prototype.canAttack = function (from, to, board) {
    return false;
  };

  King.prototype.getLocation = function () {
    return this.location;
  };

  King.prototype.setLocation = function (location) {
    this.location = location;
  };

  return King;
}(Piece_1.Piece);

exports.King = King;
},{"./Piece":"IjT0"}],"COJD":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Board = void 0;

var Square_1 = require("./Square");

var Pawn_1 = require("./Pieces/Pawn");

var PieceType_1 = require("./Pieces/PieceType");

var Knight_1 = require("./Pieces/Knight");

var Bishop_1 = require("./Pieces/Bishop");

var Rook_1 = require("./Pieces/Rook");

var Queen_1 = require("./Pieces/Queen");

var King_1 = require("./Pieces/King");

var DrawPiece_1 = require("../display/DrawPiece");

var Board =
/** @class */
function () {
  function Board(game) {
    this.squares = [];
    this.selectedSquares = [];
    this.highlightedSquares = [];
    this.game = game;
    this.initializeBoard();
  }

  Board.prototype.initializeBoard = function () {
    var domSquares = document.getElementById("board").getElementsByClassName("box");

    for (var i = 0; i < 8; i++) {
      this.squares[i] = [];

      for (var j = 0; j < 8; j++) {
        this.squares[i][j] = new Square_1.Square(i, j);
        this.squares[i][j].setDomSquare(domSquares[8 * i + j]);
        this.assignEventListener(this.squares[i][j]);
      }
    }

    this.initializePieces();
  };

  Board.prototype.assignEventListener = function (square) {
    var _this = this;

    square.getDomSquare().addEventListener("click", function () {
      return _this.clickHandler(square);
    });
  };

  Board.prototype.clickHandler = function (square) {
    //check if the click intends to select piece and assign it as 1st click
    if (square.getPiece() != null && square.getPiece().isWhite() == this.game.getCurrentTurn().isWhiteSide()) {
      if (square != this.selectedSquares[0]) {
        this.clearHighlightedSquares();
      }

      this.selectedSquares[0] = square;
      this.highlightSquares();
    } //check if the click intends to select destination and assign it as 2nd click


    if (this.selectedSquares.length) {
      if (square.getPiece() == null || square.getPiece().isWhite() != this.game.getCurrentTurn().isWhiteSide()) {
        this.selectedSquares[1] = square;
        this.game.getCurrentTurn().playedMove(this.selectedSquares[0], this.selectedSquares[1], this.game);
        this.clearHighlightedSquares();
        this.selectedSquares = [];
      }
    }
  }; //highlight all possible moves, if it's capturing move or enPassante move highlight as attack


  Board.prototype.highlightSquares = function () {
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        var selectedPiece = this.selectedSquares[0].getPiece();

        if (selectedPiece.canMove(this.selectedSquares[0], this.getSquares()[i][j], this)) {
          this.getSquares()[i][j].getDomSquare().classList.add("active");

          if (this.getSquares()[i][j].getPiece() != null && this.getSquares()[i][j].getPiece().isWhite() != this.game.getCurrentTurn().isWhiteSide() || selectedPiece instanceof Pawn_1.Pawn && selectedPiece.isEnPassant(this.selectedSquares[0], this.getSquares()[i][j], this)) {
            this.getSquares()[i][j].getDomSquare().classList.add("beating");
          }

          this.highlightedSquares.push(this.getSquares()[i][j]);
        }
      }
    }
  };

  Board.prototype.clearHighlightedSquares = function () {
    this.highlightedSquares.forEach(function (element) {
      element.getDomSquare().classList.remove("active", "beating");
    });
    this.highlightedSquares = [];
  };

  Board.prototype.initializePieces = function () {
    var white = 'white';
    var black = 'black';

    for (var i = 0; i < 8; i++) {
      this.squares[1][i].setPiece(new Pawn_1.Pawn(true));
      this.squares[1][i].getDomSquare().append(DrawPiece_1.drawImage(PieceType_1.PieceType.Pawn, white));
      this.squares[6][i].setPiece(new Pawn_1.Pawn(false));
      this.squares[6][i].getDomSquare().append(DrawPiece_1.drawImage(PieceType_1.PieceType.Pawn, black));
    }

    this.squares[0][1].setPiece(new Knight_1.Knight(true));
    this.squares[0][1].getDomSquare().append(DrawPiece_1.drawImage(PieceType_1.PieceType.Knight, white));
    this.squares[0][6].setPiece(new Knight_1.Knight(true));
    this.squares[0][6].getDomSquare().append(DrawPiece_1.drawImage(PieceType_1.PieceType.Knight, white));
    this.squares[0][2].setPiece(new Bishop_1.Bishop(true));
    this.squares[0][2].getDomSquare().append(DrawPiece_1.drawImage(PieceType_1.PieceType.Bishop, white));
    this.squares[0][5].setPiece(new Bishop_1.Bishop(true));
    this.squares[0][5].getDomSquare().append(DrawPiece_1.drawImage(PieceType_1.PieceType.Bishop, white));
    this.squares[0][0].setPiece(new Rook_1.Rook(true));
    this.squares[0][0].getDomSquare().append(DrawPiece_1.drawImage(PieceType_1.PieceType.Rook, white));
    this.squares[0][7].setPiece(new Rook_1.Rook(true));
    this.squares[0][7].getDomSquare().append(DrawPiece_1.drawImage(PieceType_1.PieceType.Rook, white));
    this.squares[0][3].setPiece(new Queen_1.Queen(true));
    this.squares[0][3].getDomSquare().append(DrawPiece_1.drawImage(PieceType_1.PieceType.Queen, white));
    this.squares[0][4].setPiece(new King_1.King(true));
    this.squares[0][4].getDomSquare().append(DrawPiece_1.drawImage(PieceType_1.PieceType.King, white));
    this.squares[7][1].setPiece(new Knight_1.Knight(false));
    this.squares[7][1].getDomSquare().append(DrawPiece_1.drawImage(PieceType_1.PieceType.Knight, black));
    this.squares[7][6].setPiece(new Knight_1.Knight(false));
    this.squares[7][6].getDomSquare().append(DrawPiece_1.drawImage(PieceType_1.PieceType.Knight, black));
    this.squares[7][2].setPiece(new Bishop_1.Bishop(false));
    this.squares[7][2].getDomSquare().append(DrawPiece_1.drawImage(PieceType_1.PieceType.Bishop, black));
    this.squares[7][5].setPiece(new Bishop_1.Bishop(false));
    this.squares[7][5].getDomSquare().append(DrawPiece_1.drawImage(PieceType_1.PieceType.Bishop, black));
    this.squares[7][0].setPiece(new Rook_1.Rook(false));
    this.squares[7][0].getDomSquare().append(DrawPiece_1.drawImage(PieceType_1.PieceType.Rook, black));
    this.squares[7][7].setPiece(new Rook_1.Rook(false));
    this.squares[7][7].getDomSquare().append(DrawPiece_1.drawImage(PieceType_1.PieceType.Rook, black));
    this.squares[7][3].setPiece(new Queen_1.Queen(false));
    this.squares[7][3].getDomSquare().append(DrawPiece_1.drawImage(PieceType_1.PieceType.Queen, black));
    this.squares[7][4].setPiece(new King_1.King(false));
    this.squares[7][4].getDomSquare().append(DrawPiece_1.drawImage(PieceType_1.PieceType.King, black));
  };

  Board.prototype.isDestinationUnderAttack = function (from, destination, board) {
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        var attackingPiece = board.getSquares()[i][j].getPiece();

        if (attackingPiece != null && this.game.getCurrentTurn().isWhiteSide() != attackingPiece.isWhite()) {
          if (attackingPiece.canAttack(board.getSquares()[i][j], destination, board)) {
            return true;
          }
        }
      }
    }
  };

  Board.prototype.getSquares = function () {
    return this.squares;
  };

  Board.prototype.getGame = function () {
    return this.game;
  };

  return Board;
}();

exports.Board = Board;
},{"./Square":"xcte","./Pieces/Pawn":"myQD","./Pieces/PieceType":"PfBc","./Pieces/Knight":"jkoJ","./Pieces/Bishop":"PPJx","./Pieces/Rook":"G7S6","./Pieces/Queen":"mPVM","./Pieces/King":"DykZ","../display/DrawPiece":"bEfa"}],"Yrrp":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameStatus = void 0;
var GameStatus;

(function (GameStatus) {
  GameStatus[GameStatus["ACTIVE"] = 0] = "ACTIVE";
  GameStatus[GameStatus["BLACK_WIN"] = 1] = "BLACK_WIN";
  GameStatus[GameStatus["WHITE_WIN"] = 2] = "WHITE_WIN";
  GameStatus[GameStatus["STALEMATE"] = 3] = "STALEMATE";
})(GameStatus = exports.GameStatus || (exports.GameStatus = {}));
},{}],"GlVz":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = void 0;

var Player_1 = require("./Player");

var Board_1 = require("./Board");

var Pawn_1 = require("./Pieces/Pawn");

var King_1 = require("./Pieces/King");

var GameStatus_1 = require("./GameStatus");

var Game =
/** @class */
function () {
  function Game(firstName, secondName, timeLimit) {
    this.players = [];
    this.gameStatus = GameStatus_1.GameStatus.ACTIVE;
    this.players[0] = new Player_1.Player(firstName, timeLimit, true);
    this.players[1] = new Player_1.Player(secondName, timeLimit, false);
    this.currentTurn = this.players[0];
    this.board = new Board_1.Board(this);
    this.movesPlayed = [];
  }

  Game.prototype.recordMove = function (move) {
    this.movesPlayed.push(move);
  }; //validates and executes played move


  Game.prototype.makeMove = function (move, player) {
    var sourcePiece = move.getStartSquare().getPiece(); //is there anybody out there?

    if (!sourcePiece) {
      return false;
    } //is it your turn?


    if (player != this.currentTurn) {
      return false;
    } //is it your piece?


    if (sourcePiece.isWhite() != player.isWhiteSide()) {
      return false;
    } //can you move it?


    if (!sourcePiece.canMove(move.getStartSquare(), move.getDestinationSquare(), this.board)) {
      return false;
    } //are we gonna kill somepiece?


    var destinationPiece = move.getDestinationSquare().getPiece();

    if (destinationPiece) {
      destinationPiece.kill(move.getDestinationSquare());
      move.setCapturedPiece(destinationPiece);
    } //is this enPassant move?


    if (sourcePiece instanceof Pawn_1.Pawn && sourcePiece.isEnPassant(move.getStartSquare(), move.getDestinationSquare(), this.board)) {
      this.getRecentMove().getMovedPiece().kill(this.getRecentMove().getDestinationSquare());
      move.setEnPassanteMove(true);
      move.setCapturedPiece(this.getRecentMove().getMovedPiece());
    } //is this castling move?


    if (sourcePiece instanceof King_1.King && sourcePiece.isValidCastling(move.getStartSquare(), move.getDestinationSquare(), this.board)) {
      var currentRow = move.getStartSquare().getRow();
      var horizontalDistance = move.getDestinationSquare().getColumn() - move.getStartSquare().getColumn();
      var horizontalDistanceDelta = Math.abs(horizontalDistance);
      var horizontalDirection = horizontalDistance / horizontalDistanceDelta; //find castling Rook and set moved flag

      var castlingRook = void 0;
      var RookColumnBeforeCastling = void 0;
      horizontalDistance < 0 ? RookColumnBeforeCastling = 0 : RookColumnBeforeCastling = 7;
      castlingRook = this.board.getSquares()[currentRow][RookColumnBeforeCastling].getPiece();
      castlingRook.setMoved(true); //Move rook to new position

      var RookSquareBeforeCastling = this.board.getSquares()[currentRow][RookColumnBeforeCastling];
      var RookColumnAfterCastling = move.getStartSquare().getColumn() + horizontalDirection;
      var RookSquareAfterCastling = this.board.getSquares()[currentRow][RookColumnAfterCastling];
      RookSquareBeforeCastling.setPiece(null);
      RookSquareAfterCastling.setPiece(castlingRook);
      castlingRook.draw(RookSquareBeforeCastling, RookSquareAfterCastling);
      sourcePiece.setCastlingDone(true);
      move.setCastlingMove(true);
    } //save move


    this.recordMove(move); //execute move

    move.getMovedPiece().draw(move.getStartSquare(), move.getDestinationSquare());
    move.getDestinationSquare().setPiece(move.getStartSquare().getPiece());
    move.getStartSquare().setPiece(null); //You've moved, have you?

    if (!sourcePiece.hasMoved()) {
      move.setFirstMove(true);
      sourcePiece.setMoved(true);
    } //The king is dead


    if (destinationPiece != null && destinationPiece instanceof King_1.King) {
      if (player.isWhiteSide()) {
        this.setStatus(GameStatus_1.GameStatus.WHITE_WIN);
      } else {
        this.setStatus(GameStatus_1.GameStatus.BLACK_WIN);
      }
    } //switch turn


    if (this.currentTurn === this.players[0]) {
      this.currentTurn = this.players[1];
    } else {
      this.currentTurn = this.players[0];
    }

    return true;
  };

  Game.prototype.getCurrentTurn = function () {
    return this.currentTurn;
  };

  Game.prototype.setCurrentTurn = function (currentPlayer) {
    this.currentTurn = currentPlayer;
  };

  Game.prototype.getMovesPlayed = function () {
    return this.movesPlayed;
  };

  Game.prototype.getRecentMove = function () {
    return this.movesPlayed[this.movesPlayed.length - 1];
  };

  Game.prototype.getStatus = function () {
    return this.gameStatus;
  };

  Game.prototype.setStatus = function (status) {
    this.gameStatus = status;
  };

  Game.prototype.undoMove = function () {
    if (this.movesPlayed != undefined && this.movesPlayed.length != 0) {
      var recentMove = this.getRecentMove();
      var pieceToMoveBack = recentMove.getMovedPiece();
      var attackedPiece = recentMove.getCapturedPiece();
      this.movesPlayed.pop();
      pieceToMoveBack.draw(recentMove.getDestinationSquare(), recentMove.getStartSquare());
      recentMove.getStartSquare().setPiece(pieceToMoveBack);
      recentMove.getDestinationSquare().setPiece(null);

      if (recentMove.getFirstMove()) {
        pieceToMoveBack.setMoved(false);
      }

      if (recentMove.isCastlingMove()) {
        var kingsCastlingPosition = recentMove.getDestinationSquare();
        pieceToMoveBack.setMoved(false);
        pieceToMoveBack.setCastlingDone(false);

        if (kingsCastlingPosition.getColumn() == 2) {
          var rookPosition = this.board.getSquares()[kingsCastlingPosition.getRow()][3];
          var rook = rookPosition.getPiece();
          var rookPrevPosition = this.board.getSquares()[kingsCastlingPosition.getRow()][0];
          rook.draw(rookPosition, rookPrevPosition);
          rookPosition.setPiece(null);
          rookPrevPosition.setPiece(rook);
          rook.setMoved(false);
        } else {
          var rookPosition = this.board.getSquares()[kingsCastlingPosition.getRow()][5];
          var rook = rookPosition.getPiece();
          var rookPrevPosition = this.board.getSquares()[kingsCastlingPosition.getRow()][7];
          rook.draw(rookPosition, rookPrevPosition);
          rookPosition.setPiece(null);
          rookPrevPosition.setPiece(rook);
          rook.setMoved(false);
        }
      }

      if (attackedPiece != null) {
        var attackedSquare = recentMove.getDestinationSquare();
        attackedPiece.revive();

        if (recentMove.isEnPassanteMove()) {
          var enPassanteAttackedSquare = void 0;

          if (attackedPiece.isWhite()) {
            enPassanteAttackedSquare = this.board.getSquares()[attackedSquare.getRow() + 1][attackedSquare.getColumn()];
          } else {
            enPassanteAttackedSquare = this.board.getSquares()[attackedSquare.getRow() - 1][attackedSquare.getColumn()];
          }

          attackedPiece.draw(null, enPassanteAttackedSquare);
          enPassanteAttackedSquare.setPiece(attackedPiece);
        } else {
          attackedPiece.draw(null, attackedSquare);
          attackedSquare.setPiece(attackedPiece);
        }
      }

      this.currentTurn = recentMove.getPlayer();
    }
  };

  return Game;
}();

exports.Game = Game;
},{"./Player":"PEJ1","./Board":"COJD","./Pieces/Pawn":"myQD","./Pieces/King":"DykZ","./GameStatus":"Yrrp"}],"VpCa":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChessApp = void 0;

var URLParameters_1 = require("./display/URLParameters");

var GamePage_1 = require("./display/GamePage");

var Game_1 = require("./game/Game");

var ChessApp = function ChessApp() {
  var urlParameters = new URLParameters_1.URLParameters(window.location.search);
  var gamePage = new GamePage_1.GamePage(urlParameters.getFirstName(), urlParameters.getSecondName());
  var game = new Game_1.Game(urlParameters.getFirstName(), urlParameters.getSecondName(), parseInt(urlParameters.getTime()));
  gamePage.addOnClick(game.undoMove.bind(game));
  gamePage.displayGameInfo();
};

exports.ChessApp = ChessApp;
},{"./display/URLParameters":"DeFF","./display/GamePage":"Z1VZ","./game/Game":"GlVz"}],"WJtu":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ChessApp_1 = require("./app/ChessApp");

window.onload = function () {
  return ChessApp_1.ChessApp();
};
},{"./app/ChessApp":"VpCa"}]},{},["WJtu"], null)
//# sourceMappingURL=chessGame.0dd0af66.js.map