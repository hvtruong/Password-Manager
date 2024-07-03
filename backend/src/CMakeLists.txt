cmake_minimum_required(VERSION 3.9)
cmake_policy(SET CMP0042 NEW)
set (CMAKE_CXX_STANDARD 11)

project (encryption)
add_subdirectory(C++)

# Include Node-API wrappers
execute_process(COMMAND node -p "require('node-addon-api').include"
        WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
        OUTPUT_VARIABLE NODE_ADDON_API_DIR
        )

string(REGEX REPLACE "[\r\n\"]" "" NODE_ADDON_API_DIR "${NODE_ADDON_API_DIR}")

target_include_directories(${PROJECT_NAME}
        PRIVATE
        ${NODE_ADDON_API_DIR}
)

# define NAPI_VERSION
add_definitions(-DNAPI_VERSION=3)