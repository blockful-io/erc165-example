// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/introspection/IERC165.sol";

contract ERC165MappingImplementation  is IERC165 {
    /// @dev You must not set element 0xffffffff to true
    mapping(bytes4 => bool) internal supportedInterfaces;

    constructor() {
        supportedInterfaces[IERC165.supportsInterface.selector] = true;
    }

    function supportsInterface(bytes4 interfaceID) public view virtual override returns (bool) {
        return supportedInterfaces[interfaceID];
    }
}

interface ILisa {
    function is2D() external returns (bool);
    function skinColor() external returns (string memory);
}

contract Lisa is ERC165MappingImplementation, ILisa {
    constructor() {
        supportedInterfaces[ILisa.is2D.selector ^ ILisa.skinColor.selector] = true;
    }

    function getSupportedInterfaces() public pure returns(bytes4) {
      return ILisa.is2D.selector ^ ILisa.skinColor.selector;
    }

    function is2D() external returns (bool){}
    function skinColor() external returns (string memory){}
}