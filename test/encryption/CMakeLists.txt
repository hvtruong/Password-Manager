add_executable(runAllTests tests.cpp)

target_link_libraries(runAllTests
  PRIVATE
  gmock gtest gtest_main 
  encryption
)

add_test(NAME AllTests COMMAND runAllTests)