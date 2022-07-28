// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IERC165 {
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}

abstract contract ERC165 is IERC165 {
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC165).interfaceId;
    }
}

interface Simpson {
    function is2D() external returns (bool);
    function skinColor() external returns (string memory);
}

contract Homer is ERC165, Simpson {
  
    function supportsInterface(bytes4 interfaceID) public view virtual override returns (bool) {    
        return
          interfaceID == this.supportsInterface.selector || // ERC165
          interfaceID == this.is2D.selector
                         ^ this.skinColor.selector
                         ^ this.supportsInterface.selector; // Simpson
    }

    function is2D() external returns (bool){}
    function skinColor() external returns (string memory){}
}